import { Box, CssBaseline } from '@mui/material'

import { useSelector } from 'react-redux'

import styled from '@emotion/styled'

import ChatContainer from 'components/ChatContainer'
import NoChat from 'components/NoChat'
import Sidebar from 'components/Sidebar'
import Navbar from 'scenes/Navbar'
const RootContainer = styled(Box)({
  display: "flex",
  height: "100vh",
  backgroundColor: "#ebedf0",
});

const ChatPage = () => {
  const { selectedUser } = useSelector(state => state.message)
  return (
    <>
      <RootContainer>


        {/* Sidebar */}
        <Sidebar />
        {selectedUser ? <ChatContainer user={selectedUser} /> : <NoChat />}
      </RootContainer>
    </>
  )
}

export default ChatPage