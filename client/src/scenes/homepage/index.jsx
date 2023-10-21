import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux"
import Navbar from "scenes/Navbar"
import FriendsList from "scenes/widgets/FriendsList";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import AdvertiseWidget from "scenes/widgets/advertiseWidget";
import MyPostWidget from "scenes/widgets/myPostWidget";

const HomePage = () => {
    const { _id, picture } = useSelector((state) => state.user);
    const isNonMobileScreen = useMediaQuery('(min-width:1000px)');
    return (
        <Box><Navbar />
            <Box width={'100%'}
                padding={'2rem 6%'}
                gap={'1rem'}
                display={isNonMobileScreen ? 'flex' : 'block'}
                justifyContent={'space-between'}

            >
                <Box flexBasis={isNonMobileScreen ? '26%' : undefined}>
                    <UserWidget userId={_id} picture={picture} />

                </Box>
                <Box flexBasis={isNonMobileScreen ? '42%' : undefined}
                    mt={isNonMobileScreen ? undefined : '2rem'}>
                    <MyPostWidget picturePath={picture} />
                    <PostsWidget userId={_id} />

                </Box>
                {isNonMobileScreen && <Box flexBasis={'26%'}>
                    <AdvertiseWidget />
                    <Box m={'2rem 0'} />
                    <FriendsList userId={_id} />

                </Box>}

            </Box>
        </Box>
    )
}
export default HomePage