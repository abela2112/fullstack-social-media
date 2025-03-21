import { AppBar, Avatar, Box, CssBaseline, Divider, IconButton, InputBase, List, ListItem, ListItemAvatar, ListItemText, Menu, Paper, Skeleton, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from 'state/messages'
import axios from 'axios'
import styled from '@emotion/styled'
import { Call, MoreVert, Search, Send } from '@mui/icons-material'
import { useTheme } from '@emotion/react'
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




const ChatContainer = ({ user }) => {
  const [isMessageLoading, setIsMessageLoading] = useState(true)
  const { messages, users, selectedUser } = useSelector(state => state.message)
  const { palette } = useTheme()

  const userId=useSelector(state=>state.auth.user._id)
  console.log("messages-> ", messages)
  const dispatch = useDispatch()

  const messagesEndRef = useRef(null);
 const  subscribeToNewMessages = () => {
    // Check if the message is for the selected user
    if(!selectedUser) return
    const  socket=getSocket(selectedUser._id);
      socket.on("newMessage", (message) => {
        console.log("newMessage",message)
        dispatch(setMessages((prevMessages) => [...prevMessages, message]));
      });
    }
    const unsubscribeMesage=()=>{
     
      const  socket=getSocket(selectedUser._id);
      socket.off("newMessage")
    }
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
    getmessages(selectedUser?._id)
    subscribeToNewMessages()
    return ()=> unsubscribeMesage()
  }, [selectedUser])

  
  return (
    <BoxContainer>
      {/* Chat Header */}
      <ChatHeader />

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
      <MessageInput />

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