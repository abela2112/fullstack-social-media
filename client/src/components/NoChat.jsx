import { Container } from '@mui/material'
import React from 'react'

const NoChat = () => {
  return (
    <Container sx={{
        display: 'flex',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        
        fontSize: '1rem',
        
        color: 'gray',
        
    }}>Select Messages to get started</Container>
  )
}

export default NoChat