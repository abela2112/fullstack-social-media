import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import Navbar from "scenes/Navbar"
import FriendsList from "scenes/widgets/FriendsList";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import AdvertiseWidget from "scenes/widgets/advertiseWidget";
import MyPostWidget from "scenes/widgets/myPostWidget";
import { getSocket } from "socketio";
import { setOnlineUsers } from "state";

const HomePage = () => {
    const { _id, picture } = useSelector((state) => state?.auth?.user);
    const userId = _id;
    const [searchQuery, setSearchQuery] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        if (!userId) return;
        const socket = getSocket(userId);
        socket.connect();
        // ✅ Listen for online users
        socket.on("getOnlineUsers", (onlineUsers) => {
            console.log("Online users:", onlineUsers);
            dispatch(setOnlineUsers(onlineUsers)); // Update Redux state
        });

        return () => {
            socket.off("getOnlineUsers");
        };
    }, [userId]);
    const isNonMobileScreen = useMediaQuery('(min-width:1000px)');
    return (
        <Box>
            <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
                    <PostsWidget userId={_id} searchQuery={searchQuery} />

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