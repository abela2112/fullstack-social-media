import { Box, List, ListItem, Skeleton } from '@mui/material'
import React from 'react'

const MessageuserSKeleton = () => {
  return (
    <List>
            {[1, 2, 3, 4, 5].map((item, index) => (
              <ListItem key={index} sx={{width:'100%'}}>
              <div style={{ display: 'flex', alignItems: 'center',justifyContent:'space-between', gap: '0.5rem', padding: '0.5rem',height:50,width:'100%' }} key={index} >
                <Skeleton variant='circular' width={40} height={40}/>
                <Skeleton variant='rectangle' height={40} width={"100%"} />
              </div>
              </ListItem>
            ))}
          </List>
  )
}

export default MessageuserSKeleton