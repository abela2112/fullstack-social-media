import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Call, MoreVert, Search } from '@mui/icons-material';
import { AppBar, Avatar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
const ChatHeaderContainer = styled(AppBar)(({theme})=>({
    position: "relative",
    backgroundColor:  theme.palette.background.alt,
    color: theme.palette.primary.dark,
    boxShadow: "none",
    borderBottom: `1px solid ${theme.palette.background.alt}`,
  }));
const ChatHeader = () => {
  const { messages, users, selectedUser } = useSelector(state => state.message)
    const { palette } = useTheme()
    const primaryLight = palette.primary.light;
  const main = palette.primary.main
  return (
    <ChatHeaderContainer>
            <Toolbar>
              <Avatar sx={{ mr: 2 }} alt={`${selectedUser?.firstName}`} src={selectedUser?.picture}></Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{selectedUser?.firstName} {selectedUser?.lastName}</Typography>
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
    
          </ChatHeaderContainer>
  )
}

export default ChatHeader