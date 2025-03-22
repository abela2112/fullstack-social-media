import { AppBar, Avatar, Box, CssBaseline, Divider, IconButton, InputBase, List, ListItem, ListItemAvatar, ListItemText, Menu, Paper, Skeleton, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage, setMessages } from 'state/messages'
import axios from 'axios'
import styled from '@emotion/styled'
import MessageSkeletons from './skeletons/messageSkeletons'
import { getSocket } from 'socketio'
import MessageInput from './MessageInput'
import ChatHeader from './ChatHeader'
const BoxContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.background.default,
  // backgroundColor: "#d9fdd3",
  justifyContent: "space-between",
  // backgroundImage: "url(https://www.transparenttextures.com/patterns/stardust.png)",

}));





const ChatMessages = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: "16px",
  overflowY: "auto",
  backgroundColor: theme.palette.background.default,
  flexDirection: "column",
  display: "flex",
  // height: '100%',
  flexDirection:'column',
  justifyContent:'flex-end',
  // backgroundImage: "url(https://www.transparenttextures.com/patterns/stardust.png)",
}));

const MessageBubble = styled(Paper)(({ sender, theme }) => ({
  padding: "10px",
  borderRadius: "10px",
  maxWidth: "100%",
  marginBottom: "8px",
  // alignSelf: sender ? "flex-end" : "flex-start",
  backgroundColor: sender ? theme.palette.primary.main : theme.palette.background.alt,
}));

const MessageContainer = styled(Box)(({ sender }) => ({
  display: "flex",
  gap: "0.5rem",
  alignItems: "start",
  maxWidth: "60%",
  alignSelf: sender ? "flex-end" : "flex-start",
  flexDirection: sender ? "row-reverse" : "row",

}));


let socket;

const ChatContainer = ({ user }) => {
  const userId = useSelector(state => state.auth.user._id)
  const [isMessageLoading, setIsMessageLoading] = useState(true)
  const { messages, users, selectedUser } = useSelector(state => state.message)
  const dispatch = useDispatch()
  const messagesEndRef = useRef(null);
  const [socketConnected, setSocketConnected] = useState(false)
  const [typing, setTyping] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  useEffect(() => {
    socket = getSocket(selectedUser._id);
    socket.on("typing", () => setIsTyping(true))
    socket.on("stop typing", () => setIsTyping(false))

  })
  useEffect(() => {

    socket.emit("setup", userId)
    socket.on("connected", () => {
      setSocketConnected(true)
      console.log("socketconnected", socketConnected)
    })
  })
  useEffect(() => {
    if (!selectedUser) return

    getmessages(selectedUser._id)
    socket.emit("join room", { senderId: userId, receiverId: selectedUser._id });
    // return () => {
    //   socket.emit("leave room", { senderId: userId, receiverId: selectedUser._id });
    // };


  }, [selectedUser, socket])

useEffect(() => {
  if (messagesEndRef.current && messages.length > 0) { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }
}, [messages]);
  const getmessages = async (id) => {
    setIsMessageLoading(true)
    try {
      const { data } = await axios(`/messages/${id}`)
      dispatch(setMessages(data))
      setIsMessageLoading(false)
    } catch (error) {
      console.error(error)
      setIsMessageLoading(false)
    }
  }

  useEffect(() => {
    if(!selectedUser) return
    socket.on("newMessage", (message) => {
      console.log("newMessage", message)

      dispatch(addMessage(message));
      // setMessages([...Messages, message])
      //getmessages(selectedUser._id)
    });
    return () => socket.off("newMessage")
  }, [selectedUser])

  
  return (
    <BoxContainer>
      {/* Chat Header */}
      <ChatHeader typing={isTyping} socketConnected={socketConnected} />

      {/* Chat Messages */}

      {
        isMessageLoading ?
        <MessageSkeletons/>
         :
          <ScrollableFeed style={{
            flex: 1,
          }}>
          <ChatMessages>
              {messages?.length > 0 && messages?.map((msg, index) => (
                <MessageContainer key={index} sender={msg.senderId?._id === userId} ref={messagesEndRef}>
                  <Avatar src={msg.senderId ? msg?.senderId?.picture : msg?.recieverId?.picture} sx={{ height: '30px', width: '30px' }} />
                  <MessageBubble sender={msg.senderId?._id === userId}>
                    {msg.image && <img src={msg.image} alt="" width={100} />}
                    {msg.text}
                  </MessageBubble>
                </MessageContainer>
            ))}

          </ChatMessages>
          </ScrollableFeed>
      }


      {/* Message Input */}
      <MessageInput typing={typing} setTyping={setTyping} socket={socket}
        socketConnected={
          socketConnected
        } />

    </BoxContainer>
  )
}

export default ChatContainer
