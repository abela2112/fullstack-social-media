// Desc: Sidebar component for displaying users and their messages
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Search, Menu, ArrowLeft, ArrowBack } from '@mui/icons-material';
import { Avatar, Box, Divider, IconButton, InputBase, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Skeleton, Tooltip, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser, setUsers } from 'state/messages';
import MessageuserSKeleton from './skeletons/messageuserSKeleton';
import { getSocket } from 'socketio';
import { setOnlineUsers } from 'state';
import WidgetWrapper from './widgetWrapper';
import FlexBetween from './flexBetween';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import { useNavigate } from 'react-router-dom';
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
  const [users, setUsers] = useState([])
  const userId = useSelector(state => state.auth.user._id)
  const onlineUsers = useSelector((state) => state.auth.onlineUsers);
  const navigate = useNavigate()
  const { selectedUser } = useSelector(state => state.message)
  const [isUserLoading, setIsUserLoading] = useState(false)
  const primaryLight = palette.primary.light;
  const neutralLight = palette.neutral.light;
  const main = palette.primary.main
  const alt = palette.background.alt

  const getUsers = async () => {
    try {
      setIsUserLoading(true)
      const data = await axios.get(`/messages/${userId}/contacts`, {
        headers: {
          "Cache-Control": "no-store"
        }
      })
      console.log("side bar users", data.data)
      // dispatch(setUsers(data.data))
      setUsers(data.data)

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
        <Tooltip title="Back Home">
          <IconButton onClick={() => navigate('/home')}>
            <ArrowBack />
          </IconButton>
        </Tooltip>
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
            {users?.length > 0 ? users?.map((contact, index) => {
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

                <Box sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "start" }}>
                  {/* <ListItemText color={`primary`} primary={contact.firstName} secondary={contact.lastMessage} /> */}
                  <FlexBetween sx={{ width: "100%", alignItems: 'flex-start' }}>

                    <Typography variant="body1" color="textPrimary" fontSize={'1rem'}>{contact.firstName}</Typography>
                    <Typography variant="h6" color="textSecondary">
                      {contact.time && format(subDays(new Date(contact.time), 3), 'h:mm a')}
                    </Typography>
                  </FlexBetween>
                  <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "start", flex: 1 }}>
                    <Typography variant="body2" color="textSecondary">{contact.lastMessage}</Typography>
                  </Box>


                  {/* <Typography variant="body1" color="textPrimary">{contact.firstName} {contact.lastName}</Typography> */}


                </Box>
              </ListItemButton>
            }) :
              <List>
                <ListItem>
                  <ListItemText primary="No Friends found
" />
                </ListItem>
              </List>
            }
          </List>)
      }

    </SidebarContainer>

  )
}

export default Sidebar