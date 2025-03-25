import { useTheme } from '@emotion/react'
import { Box, Container } from '@mui/material'
import React from 'react'

const NoChat = () => {
  const { palette } = useTheme()
  return (
    <Box sx={{
      backgroundColor: palette.background.default,
      display: 'flex',
      flex: 1,
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',

      fontSize: '1rem',

      color: 'gray',

    }}>Select Messages to get started</Box>
  )
}

export default NoChat