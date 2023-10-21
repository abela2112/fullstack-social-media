import { useTheme } from '@emotion/react'
import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setFriends } from 'state'
import FlexBetween from './flexBetween'
import UserImage from './userImage'
import { Box, IconButton, Typography } from '@mui/material'
import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material'

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
    const friends = useSelector((state) => state.user.friends)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { palette } = useTheme()

    const { _id } = useSelector((state) => state.user)
    const isFriend = friends?.find((friend) => friend._id === friendId);

    const primaryLight = palette.primary.light;

    const main = palette.primary.main
    const medium = palette.primary.medium


    const patchFriend = async () => {
        try {
            const { data } = await axios.patch(`users/${_id}/${friendId}`, {

            })
            dispatch(setFriends({ friends: data }))


        } catch (error) {
            console.log(error)
        }
    }

    return (
        <FlexBetween>
            <FlexBetween gap={'1rem'}>
                <UserImage image={userPicturePath} />
                <Box onClick={() => {
                    navigate(`/profile/${friendId}`)
                    navigate(0)
                }}>
                    <Typography
                        fontWeight={'500'}
                        color={main}
                        variant='h5'
                        sx={{ '&:hover': { color: primaryLight, cursor: 'pointer' } }}>{name}</Typography>
                    <Typography fontSize={'0.75rem'} color={medium}>{subtitle}</Typography>
                </Box>
            </FlexBetween>
            <IconButton onClick={() => patchFriend()

            } sx={{ p: "0.6rem", backgroundColor: primaryLight }}>{isFriend ? <PersonRemoveOutlined /> : <PersonAddOutlined />}</IconButton>
        </FlexBetween>
    )
}

export default Friend