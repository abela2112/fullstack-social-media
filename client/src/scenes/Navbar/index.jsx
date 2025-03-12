import { useTheme } from "@emotion/react"
import { Close, DarkMode, Help, LightMode, Message, Notifications, Search } from "@mui/icons-material"
import { Box, FormControl, IconButton, InputBase, MenuItem, Select, Typography, useMediaQuery } from "@mui/material"
import FlexBetween from "components/flexBetween"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setMode, setLogout } from "state"

import MenuIcon from '@mui/icons-material/Menu';

import { socket } from "socketio"

const Navbar = () => {
    const [isMobileToggle, setIsMobileToggle] = useState(false)
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)
    const socketClient = useSelector((state) => state.auth.socketClient)
    const nonMobileScreens = useMediaQuery('(min-width: 1000px)')
    const theme = useTheme()
    const neutralLight = theme.palette.neutral.light;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;
    const fullname = `${user?.firstName} ${user?.lastName}`
    return (
        <FlexBetween padding={'1rem 6%'} backgroundColor={alt}>
            <FlexBetween gap={'1.75rem'}>
                <Typography fontSize={'clamp(1rem,2rem,2.25rem)'}
                    fontWeight={'bold'}
                    color={'primary'}
                    onClick={() => Navigate('/home')}
                    sx={
                        {
                            '&:hover': {
                                color: primaryLight,
                                cursor: 'pointer'
                            }
                        }
                    }
                >SocioMedia</Typography>
                {nonMobileScreens && (<FlexBetween bgcolor={neutralLight}
                    padding={'0.1rem 1.5rem'}
                    borderRadius={'9px'}
                    gap={'3rem'}>
                    <InputBase placeholder="search ..." />
                    <IconButton><Search /></IconButton>
                </FlexBetween>)}
            </FlexBetween>

            {/* //desktop */}
            {nonMobileScreens ? (<FlexBetween gap={'2rem'}>
                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === "dark" ? (<DarkMode sx={{ fontSize: "25px" }} />) : (<LightMode sx={{ fontSize: "25px" }} />)}
                </IconButton>
                <IconButton onClick={() => Navigate('/chat')}>
                    <Message sx={{ fontSize: "25px" }} />
                </IconButton>
                <Notifications sx={{ fontSize: "25px" }} />
                <Help sx={{ fontSize: "25px" }} />
                <FormControl variant="standard" value={fullname}>
                    <Select value={fullname}
                        sx={{
                            backgroundColor: neutralLight,
                            width: "150px",
                            borderRadius: "0.25rem",
                            "& .MuiSvgIcon-root": {
                                pr: "0.25rem",
                                width: "3rem"

                            },
                            "& .MuiSelect-select:focus": {
                                backgroundColor: neutralLight
                            }
                        }}
                        input={<InputBase />}>
                        <MenuItem value={fullname}>
                            <Typography>{fullname}</Typography></MenuItem>
                        <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
                    </Select>
                </FormControl>
            </FlexBetween>) : (
                <IconButton onClick={() => setIsMobileToggle(!isMobileToggle)}>
                    < MenuIcon sx={{ fontSize: "25px" }} />
                </IconButton>

            )}
            {!nonMobileScreens && isMobileToggle && (
                <Box position='fixed'
                    right='0'
                    bottom={'0'}
                    maxWidth={'500px'}
                    Height='100%'
                    minWidth={'300px'}
                    backgroundColor={background}
                    zIndex={10}
                    top={'0px'}>
                    <Box display={'flex'}
                        justifyContent={'flex-end'}
                        p={'1rem'}>
                        <IconButton onClick={() => setIsMobileToggle(!isMobileToggle)}>
                            <Close sx={{ fontSize: "25px" }} />
                        </IconButton>
                    </Box>
                    {/* mobile nav */}
                    <FlexBetween gap={'3rem'} display={'flex'} flexDirection={'column'} justifyItems={'center'}>
                        <IconButton onClick={() => dispatch(setMode())}>
                            {theme.palette.mode === "dark" ? (<DarkMode sx={{ fontSize: "25px" }} />) : (<LightMode sx={{ fontSize: "25px" }} />)}
                        </IconButton>
                        <IconButton onClick={() => Navigate('/chat')}>
                            <Message sx={{ fontSize: "25px" }} /></IconButton>
                        <Notifications sx={{ fontSize: "25px" }} />
                        <Help sx={{ fontSize: "25px" }} />
                        <FormControl variant="standard" value={fullname}>
                            <Select value={fullname}
                                sx={{
                                    backgroundColor: neutralLight,
                                    width: "150px",
                                    borderRadius: "0.25rem",
                                    "& .MuiSvgIcon-root": {
                                        pr: "0.25rem",
                                        width: "3rem"

                                    },
                                    "& .MuiSelect-select:focus": {
                                        backgroundColor: neutralLight
                                    }
                                }}
                                input={<InputBase />}>
                                <MenuItem value={fullname}>
                                    <Typography>{fullname}</Typography></MenuItem>
                                <MenuItem onClick={() => {
                                    // const socket = io('http://localhost:4000')
                                    window.localStorage.removeItem('userId')
                                    // if (socketClient?.connected) {
                                    //     socket.disconnect()
                                    //     console.log("socket connected", socketClient?.connected)


                                    // }
                                    dispatch(setLogout())
                                }}>Logout</MenuItem>
                            </Select>
                        </FormControl>
                    </FlexBetween>
                </Box>
            )}
        </FlexBetween>


    )
}
export default Navbar