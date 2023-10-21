import { Box, useMediaQuery } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "scenes/Navbar"
import FriendsList from "scenes/widgets/FriendsList"
import PostsWidget from "scenes/widgets/PostsWidget"
import UserWidget from "scenes/widgets/UserWidget"
import MyPostWidget from "scenes/widgets/myPostWidget"

const ProfilePage = () => {
    const isNonMobileScreen = useMediaQuery('(min-width:1000px)')
    const { userId } = useParams()
    const [user, setUser] = useState(null)
    const getUser = async () => {
        const { data } = await axios.get(`users/${userId}`);
        setUser(data);
    }
    useEffect(() => {
        getUser();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps 
    if (!user) {
        return null
    }

    return (
        <Box>
            <Navbar />
            <Box width={'100%'}
                padding={'2rem 6%'}
                gap={'2rem'}
                display={isNonMobileScreen ? 'flex' : 'block'}
                justifyContent={'center'}

            >
                <Box flexBasis={isNonMobileScreen ? '26%' : undefined}>
                    <UserWidget userId={user._id} picture={user.picture} />
                    <Box m={'2rem 0'} />
                    <FriendsList userId={user._id} />

                </Box>
                <Box flexBasis={isNonMobileScreen ? '42%' : undefined}
                    mt={isNonMobileScreen ? undefined : '2rem'}>
                    <MyPostWidget picturePath={user.picture} />
                    <PostsWidget userId={user?._id} isProfile={true} />

                </Box>

            </Box>
        </Box>
    )
}
export default ProfilePage