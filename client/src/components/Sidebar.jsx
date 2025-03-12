// import { Box, Button, Typography } from '@mui/material'
// import React, { useEffect, useState } from 'react'
// import WidgetWrapper from './widgetWrapper'
// import axios from 'axios'
// import { setUsers,setSelectedUser } from 'state/messages'
// import { useDispatch, useSelector } from 'react-redux'
// import { useTheme } from '@emotion/react'

// const Sidebar = () => {
//   const dispatch = useDispatch()
//   const { palette } = useTheme()
//   const {_id:userId}=useSelector(state=>state.auth.user)
//   const {users,selectedUser} = useSelector(state=>state.message)
//   const [isUserLoading,setIsUserLoading]=useState(false)
//   const primaryLight = palette.primary.light;

//   const main = palette.primary.main
//   const medium = palette.primary.medium

//   const getUsers=async()=>{
//     try {
//      setIsUserLoading(true)
//      const data=await axios.get(`/messages/${userId}/friends`)

//      dispatch(setUsers(data.data))

//     } catch (error) {
//      setIsUserLoading(false)
//        console.log(error)
//     }
//     finally{
//      setIsUserLoading(false)
//     }
//    }
//   useEffect(() => {
//     getUsers()
//   }, []) // eslint-disable-line react-hooks/exhaustive-deps 


//   if(isUserLoading){
//     return <WidgetWrapper>
//       loading...
//     </WidgetWrapper>

//   }
//   console.log("selectedUser",selectedUser)
//   return (
//     <Box sx={{overflowY:'auto',height:'100vh',backgroundColor:'#fff',borderRight:'1px solid #f4f4f4'}}>
//       {users?.length>0 ? users?.length>0 && users.map(user=>(
//         <Button key={user._id} 
//         onClick={()=>dispatch(setSelectedUser(user))} fullWidth
//         sx={{
//           display:'flex',justifyContent:'start', alignItems:'center',gap:'1rem',transition:"all 0.3s ease" ,padding:'0.5rem',
//           '&:hover':{
//             backgroundColor:primaryLight
//           },
//           backgroundColor:user?._id===selectedUser?._id ? '#f4f4f4':palette.background.default
//         }}
//         >
//           <div>
//             <img src={user?.profilePic || '/assets/avatar.png'} alt={user.firstname} style={{width:'30px',height:'30px',borderRadius:'50%'}}/>
//           </div>
//           <Typography>
//             {user.firstName} {user.lastName}
//           </Typography>
//         </Button>
//       )): <Box>No users found</Box>}
//     </Box>
//   )
// }

// export default Sidebar
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

const SidebarContainer = styled(Box)({
  width: 300,
  borderRight: "1px solid #ddd",
  backgroundColor: "#fff",
  display: "flex",
  flexDirection: "column",
});
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

  const main = palette.primary.main
  const medium = palette.primary.medium
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
        <Box display="flex" alignItems="center" px={2}>
          <Search />
          <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search..." />
        </Box>
      </Box>
      <Divider />

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
                      backgroundColor: primaryLight,
                      cursor: 'pointer'
                    },
                    backgroundColor: selectedUser?._id === contact._id ? main : palette.background.default
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