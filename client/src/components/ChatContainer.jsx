import { AppBar, Avatar, Box, CssBaseline, Divider, IconButton, InputBase, List, ListItem, ListItemAvatar, ListItemText, Menu, Paper, Skeleton, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from 'state/messages'
import axios from 'axios'
import styled from '@emotion/styled'
import { Call, MoreVert, Search, Send } from '@mui/icons-material'
import { useTheme } from '@emotion/react'
import MessageSkeletons from './skeletons/messageSkeletons'
import { getSocket } from 'socketio'
const BoxContainer = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  backgroundColor: "#d9fdd3",
  justifyContent: "space-between",
});



const ChatHeader = styled(AppBar)({
  position: "relative",
  backgroundColor: "#fff",
  color: "#000",
  boxShadow: "none",
  borderBottom: "1px solid #ddd",
});

const ChatMessages = styled(Box)({
  flex: 1,
  padding: "16px",
  overflowY: "auto",
  backgroundColor: "#ebf0f4",
  flexDirection: "column",
  display: "flex",
  flexDirection:'column',
  justifyContent:'flex-end',
  backgroundImage: "url(https://www.transparenttextures.com/patterns/stardust.png)",
});

const MessageBubble = styled(Paper)(({ sender }) => ({
  padding: "10px",
  borderRadius: "10px",
  maxWidth: "60%",
  marginBottom: "8px",
  alignSelf: sender ? "flex-end" : "flex-start",
  backgroundColor: sender ? "#dcf8c6" : "#fff",
}));

const MessageInputContainer = styled(Box)({
  padding: "10px",
  backgroundColor: "#fff",
  display: "flex",
  alignItems: "center",
  borderTop: "1px solid #ddd",
});



const ChatContainer = ({ user }) => {
  const [isMessageLoading, setIsMessageLoading] = useState(true)
  const { messages, users, selectedUser } = useSelector(state => state.message)
  const [newMessage, setNewMessage] = useState("")
  const { palette } = useTheme()
  const userId=useSelector(state=>state.auth.user._id)
  console.log("userId",userId)
  console.log("messages",messages)
  const primaryLight = palette.primary.light;
  const main = palette.primary.main
  const dispatch = useDispatch()
  const sendMessage=async()=>{
    try {
      const {data}=await axios.post(`messages/send/${selectedUser._id}`,{
text:newMessage
      })
      console.log("data",data)
 
    } catch (error) {
      console.log("error",error)
    }
 }
  const messagesEndRef = useRef(null);
 const  subscribeToNewMessages = () => {
    // Check if the message is for the selected user
    if(!selectedUser) return
    const  socket=getSocket(selectedUser._id);
      socket.on("newMessage", (message) => {
        console.log("newMessage",message)
        dispatch(setMessages((messages) => [...messages, message]));
      });
    }
    const unsubscribeMesage=()=>{
     
      const  socket=getSocket(selectedUser._id);
      socket.off("newMessage")
    }
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
    getmessages(selectedUser?._id)
    subscribeToNewMessages()
    return ()=> unsubscribeMesage()
  }, [selectedUser])

  
  return (
    <BoxContainer>
      {/* Chat Header */}
      <ChatHeader>
        <Toolbar>
          <Avatar sx={{ mr: 2 }} alt={`${user?.firstName}`} src={user?.picture}></Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6">{user?.firstName} {user?.lastName}</Typography>
            <Typography variant="body2" color="textSecondary">
              Last seen 5 mins ago
            </Typography>
          </Box>
          <IconButton sx={{
            '&:hover': {
              backgroundColor: primaryLight
            },


          }}>
            <Search />
          </IconButton>
          <IconButton sx={{
            '&:hover': {
              backgroundColor: primaryLight
            },

          }}
          >
            <Call />
          </IconButton>
          <IconButton sx={{
            '&:hover': {
              backgroundColor: primaryLight
            }
          }}>
            <MoreVert />
          </IconButton>
        </Toolbar>

      </ChatHeader>

      {/* Chat Messages */}

      {
        isMessageLoading ?
        <MessageSkeletons/>
         :
          <ChatMessages>
            {messages?.length>0 && messages?.map((msg, index) => (
              <MessageBubble key={index} sender={msg.senderId===userId}>
                {msg.text}
              </MessageBubble>
            ))}
            <div ref={messagesEndRef} />
          </ChatMessages>
      }


      {/* Message Input */}
      <MessageInputContainer>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <IconButton sx={{
          '&:hover': {
            backgroundColor: primaryLight
          },

          color: main
        }}
          onClick={sendMessage}>
          <Send />
        </IconButton>
      </MessageInputContainer>
    </BoxContainer>
  )
}

export default ChatContainer


// const ChatContainer = () => {
//     const [isMessageLoading, setIsMessageLoading] = useState(false)
//     const { messages, users,selectedUser } = useSelector(state => state.message)
//     const [newMessage, setNewMessage] = useState("")

//     const dispatch = useDispatch()
//     const getmessages = async (id) => {
//         setIsMessageLoading(true)
//         try {
//             const { data } = await axios(`/api/messages/${id}`)
//             dispatch(setMessages(data))
//             setIsMessageLoading(false)
//         } catch (error) {
//             console.error(error)
//             setIsMessageLoading(false)
//         }
//     }
//     useEffect(() => {
//         getmessages(selectedUser?._id)
//     }, [selectedUser?._id])

//     if (isMessageLoading) {
//         return <Box>Loading...</Box>
//     }
//     return (

//           <RootContainer>
//       <CssBaseline/>

//       {/* Sidebar */}
//       <Sidebar>
//         <Box p={2} display="flex" alignItems="center">
//           <IconButton>
//             <Menu />
//           </IconButton>
//           <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
//             Chatgram
//           </Typography>
//           <IconButton>
//             <MoreVert />
//           </IconButton>
//         </Box>

//         <Box display="flex" alignItems="center" px={2} py={1}>
//           <Search/>
//           <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search..." />
//         </Box>

//         <Divider />

//         <List>
//           {users.map((contact, index) => (
//             <ListItem button key={index}>
//               <ListItemAvatar>
//                 <Avatar>{contact.name[0]}</Avatar>
//               </ListItemAvatar>
//               <ListItemText primary={contact.name} secondary={contact.message} />
//               <Typography variant="body2" color="textSecondary">
//                 {contact.time}
//               </Typography>
//             </ListItem>
//           ))}
//         </List>
//       </Sidebar>
//       <BoxContainer>
//         {/* Chat Header */}
//         <ChatHeader>
//           <Toolbar>
//             <Avatar sx={{ mr: 2 }}>D</Avatar>
//             <Box sx={{ flexGrow: 1 }}>
//               <Typography variant="h6">David Moore</Typography>
//               <Typography variant="body2" color="textSecondary">
//                 Last seen 5 mins ago
//               </Typography>
//             </Box>
//             <IconButton>
//               <Search />
//             </IconButton>
//             <IconButton>
//               <Call />
//             </IconButton>
//             <IconButton>
//               <MoreVert/>
//             </IconButton>
//           </Toolbar>

//         </ChatHeader>

//         {/* Chat Messages */}
//         <ChatMessages>
//           {messages.map((msg, index) => (
//             <MessageBubble key={index} sender={msg.sender}>
//               {msg.text}
//             </MessageBubble>
//           ))}
//         </ChatMessages>

//         {/* Message Input */}
//         <MessageInputContainer>
//           <InputBase
//             sx={{ ml: 1, flex: 1 }}
//             placeholder="Message"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             // onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//           />
//           <IconButton >
//             {/* onClick={sendMessage} */}
//             <Send />
//           </IconButton>
//         </MessageInputContainer>
//       </BoxContainer>
//       </RootContainer>
//     )
// }

// export default ChatContainer