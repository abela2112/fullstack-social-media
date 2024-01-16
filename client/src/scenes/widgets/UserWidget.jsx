import { useTheme } from '@emotion/react'
import { EditOutlined, LocationCityOutlined, ManageAccountsOutlined, WorkOutlineOutlined } from '@mui/icons-material'
import { Box, Divider, Typography } from '@mui/material'
import axios from 'axios'
import FlexBetween from 'components/flexBetween'
import UserImage from 'components/userImage'
import WidgetWrapper from 'components/widgetWrapper'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const UserWidget = ({ picture, userId }) => {

    const navigate = useNavigate()
    const { palette } = useTheme()
    const [user, setuser] = useState(null)
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    useEffect(() => {
        const getUser = async () => {
            try {
                axios.get(`users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
                        'Content-Type': 'application/json' // Adjust the content type according to your API requirements
                    }
                }).then(({ data }) => {
                    setuser(data);
                });


            } catch (error) {
                console.error(error);
            }

        }
        getUser();
    }, [])
    if (!user) {
        return null;
    }
    const {
        firstName, lastName, location, occupation, friends, impressions, viewedProfile
    } = user
    return (
        <WidgetWrapper>
            <FlexBetween
                gap={'0.5rem'}
                pb={'1.1rem'}
                onClick={() => navigate(`/profile/${userId}`)}
            >
                <FlexBetween gap={'0.5rem'}>
                    <UserImage image={picture} />
                    <Box>
                        <Typography variant='h4' color={dark} fontWeight={'500'}
                            sx={{
                                '&:hover': {
                                    cursor: 'pointer',
                                    color: palette.primary.light
                                }
                            }} >{firstName} {lastName}</Typography>
                        <Typography color={medium}>{friends?.length} friends</Typography>
                    </Box>
                </FlexBetween>

                <ManageAccountsOutlined />

            </FlexBetween>
            <Divider />
            <Box padding={'1rem 0'}>
                <Box display={'flex'} alignItems={'center'} gap={'0.5rem'} >
                    <LocationCityOutlined sx={{ color: medium }} fontSize='large' />
                    <Typography color={medium}>{location}</Typography>
                </Box>

                <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                    <WorkOutlineOutlined sx={{ color: medium }} fontSize='large' />
                    <Typography color={medium}>{occupation}</Typography>
                </Box>
            </Box>
            <Divider />
            <Box p={'1rem 0'}>
                <FlexBetween mb={'0.5rem'}>
                    <Typography color={medium}>who's viewed your profile</Typography>
                    <Typography color={main} fontWeight={'500'}>{viewedProfile}</Typography>
                </FlexBetween>
                <FlexBetween mb={'0.5rem'}>
                    <Typography color={medium}>Impresions on your post</Typography>
                    <Typography color={main} fontWeight={'500'}>{impressions}</Typography>
                </FlexBetween>
            </Box>
            <Divider />
            <Box p={'1rem 0'}>
                <Typography color={medium} fontSize={'1rem'}>social profile</Typography>
                <FlexBetween gap={'0.5rem'} mb={'1rem'}>
                    <FlexBetween gap={'0.5rem'}>
                        <img src="../assets/twitter.png" alt="twitter" />
                        <Box>
                            <Typography color={medium} fontWeight={'500'}>twitter</Typography>
                            <Typography color={main} >social network</Typography>

                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: { main } }} />
                </FlexBetween>
                <FlexBetween gap={'0.5rem'}>
                    <FlexBetween gap={'0.5rem'}>
                        <img src="../assets/linkedin.png" alt="linkedin" />
                        <Box>
                            <Typography color={medium} fontWeight={'500'}>Linkedin</Typography>
                            <Typography color={main} >Network platform</Typography>

                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: { main } }} />
                </FlexBetween>
            </Box>


        </WidgetWrapper>
    )
}

export default UserWidget