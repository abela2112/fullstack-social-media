import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFriends } from 'state'
import WidgetWrapper from '../../components/widgetWrapper'
import { Box, Typography } from '@mui/material'
import { useTheme } from '@emotion/react'
import Friend from '../../components/Friend'
import axios from 'axios'
const FriendsList = ({ userId }) => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const { palette } = useTheme()
    const friends = useSelector((state) => state.auth.user.friends)
    const dark = palette.neutral.dark
    const medium = palette.neutral.medium
    const getFriends = async () => {
        setIsLoading(true)
        const { data } = await axios.get(`users/${userId}/friends`)
        setIsLoading(false)
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
                {isLoading && <p>Loading...</p>}
                {friends.length > 0 ? friends.map((friend) => (
                    <Friend
                        friendId={friend._id}
                        name={`${friend.firstName} ${friend.lastName}`}
                        subtitle={friend.occupation}
                        userPicturePath={friend.picture}

                    />
                )) : (
                    <Typography
                        color={medium}
                        variant='h5'
                        fontWeight={'500'}
                        sx={{ mb: '1.5rem' }}
                    >No friends</Typography>
                )}
            </Box>
        </WidgetWrapper>
    )
}

export default FriendsList