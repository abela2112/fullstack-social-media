import styled from '@emotion/styled';
import { Box, Skeleton } from '@mui/material'
import React from 'react'
const ChatMessages = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: "16px",
  overflowY: "auto",
  backgroundColor: theme.palette.background.default,
  flexDirection: "column",
  display: "flex",
  flexDirection:'column',
  justifyContent:'flex-end',
  // backgroundImage: "url(https://www.transparenttextures.com/patterns/stardust.png)",
}));

const MessageSkeleton = styled(Box)(({ sender }) => ({
  width: "50%",
  height: "40px",
  marginBottom: "8px",
  borderRadius: "20px",
  // backgroundColor: "#dcf8c6",
  alignSelf: sender ? "flex-end" : "flex-start",
}));
const MessageSkeletons = () => {

  return (
    <ChatMessages>

    <div style={{ display: "flex", flexDirection: "column",justifyContent:'flex-end', alignItems:'flex-end',width:'100%'}}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
       <MessageSkeleton key={index} sender={index % 2 === 0}>
         <Skeleton variant="rounded"  height={40} />
       </MessageSkeleton>
     ))}
    </div>
   </ChatMessages> 
  )
}

export default MessageSkeletons