import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFriends } from 'state'
import WidgetWrapper from '../../components/widgetWrapper'
import { Box, Typography } from '@mui/material'
import { useTheme } from '@emotion/react'
import Friend from '../../components/Friend'
import axios from 'axios'
const FriendsList = ({ userId }) => {
    const dispatch = useDispatch()
    const { palette } = useTheme()
    const friends = useSelector((state) => state.user.friends)
    const main = palette.neutral.main
    const medium = palette.neutral.medium
    const dark = palette.neutral.dark
    const getFriends = async () => {
        const { data } = await axios.get(`users/${userId}/friends`)
        dispatch(setFriends({ friends: data }))
    }
    useEffect(() => {
        getFriends()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps 
    return (
        <WidgetWrapper>
            <Typography variant='h5' color={dark} fontWeight={'500'}
                sx={{ mb: '1.5rem' }}
            >Friend list</Typography>
            <Box mt={'1rem'} display={'flex'} flexDirection={'column'} gap={'2rem'}>
                {friends.length > 0 && friends.map((friend) => (
                    <Friend
                        friendId={friend._id}
                        name={`${friend.firstName} ${friend.lastName}`}
                        subtitle={friend.occupation}
                        userPicturePath={friend.picture}

                    />
                ))}
            </Box>
        </WidgetWrapper>
    )
}

export default FriendsList