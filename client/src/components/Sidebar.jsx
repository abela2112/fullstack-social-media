// Desc: Sidebar component for displaying users and their messages
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Search, Menu } from '@mui/icons-material';
import { Avatar, Box, Divider, IconButton, InputBase, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Skeleton, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser, setUsers } from 'state/messages';
import MessageuserSKeleton from './skeletons/messageuserSKeleton';
import { getSocket } from 'socketio';
import { setOnlineUsers } from 'state';
import WidgetWrapper from './widgetWrapper';
import FlexBetween from './flexBetween';

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 300,
  borderRight: `1px solid ${theme.palette.background.alt}`,
  backgroundColor: theme.palette.background.alt,
  display: "flex",
  flexDirection: "column",
}));
const OnlineIndicator = styled(Box)({
  width: 12,
  height: 12,
  borderRadius: "50%",
  backgroundColor: "green",
  position: "absolute",
  bottom: 2,
  right: 12,
  border: "2px solid white",
});

const Sidebar = () => {
  const dispatch = useDispatch()
  const { palette } = useTheme()
  const userId = useSelector(state => state.auth.user._id)
  const onlineUsers = useSelector((state) => state.auth.onlineUsers);

  const { users, selectedUser } = useSelector(state => state.message)
  const [isUserLoading, setIsUserLoading] = useState(false)
  const primaryLight = palette.primary.light;
  const neutralLight = palette.neutral.light;
  const main = palette.primary.main
  const alt = palette.background.alt
  console.log("onlineUsers", onlineUsers)
  const getUsers = async () => {
    try {
      setIsUserLoading(true)
      const data = await axios.get(`/messages/${userId}/friends`)

      dispatch(setUsers(data.data))

    } catch (error) {
      setIsUserLoading(false)
      console.log(error)
    }
    finally {
      setIsUserLoading(false)
    }
  }

  useEffect(() => {
    getUsers()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps 



  return (

    <SidebarContainer>
      <Box p={2} display="flex" alignItems="center" justifyContent="space-between">
        <IconButton>
          <Menu />
        </IconButton>
        <FlexBetween bgcolor={neutralLight}
          padding={'0.1rem 1.5rem'}
          borderRadius={'9px'}
          gap={'3rem'}>
          <InputBase placeholder="search ..." />
          <IconButton><Search /></IconButton>
        </FlexBetween>
      </Box>
      {/* <Divider /> */}

      {
        isUserLoading ?
          <MessageuserSKeleton />
          :
          (<List>
            {users?.length > 0 && users?.map((contact, index) => {
              const isOnline = onlineUsers?.some(user => user === contact._id); // Check if user is online

              return <ListItemButton key={index}
                onClick={() => dispatch(setSelectedUser(contact))}
                sx={
                  {
                    '&:hover': {
                      backgroundColor: selectedUser?._id === contact._id ? main : neutralLight,
                      cursor: 'pointer'
                    },
                    backgroundColor: selectedUser?._id === contact._id && main 
                  }
                }
              >
                <ListItemAvatar>
                  <Box sx={{ position: "relative" }}>
                    <Avatar alt={`${contact?.firstName}`} src={contact?.picture} />
                    {isOnline && <OnlineIndicator />} {/* Show green dot if online */}
                  </Box>
                </ListItemAvatar>

                <ListItemText color={`primary`} primary={contact.firstName} secondary={contact.message} />
                <Typography variant="body2" color="textSecondary">
                  {contact.time}
                </Typography>
              </ListItemButton>
            })}
          </List>)
      }

    </SidebarContainer>

  )
}

export default Sidebar