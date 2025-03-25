import { useTheme } from '@emotion/react'
import { Box, Button, Divider, IconButton, InputBase, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setPosts } from 'state'
import WidgetWrapper from 'components/widgetWrapper'
import FlexBetween from 'components/flexBetween'
import UserImage from 'components/userImage'
import Dropzone from 'react-dropzone'
import { AttachFileOutlined, DeleteOutline, Edit, GifBox, ImageOutlined, MicOutlined, MoreHorizOutlined } from '@mui/icons-material'
const MyPostWidget = ({ picturePath }) => {
    const { _id } = useSelector((state) => state.auth.user)
    const { palette } = useTheme()
    const [isLoading, setIsLoading] = useState(false)
    const [post, setPost] = useState('')
    const [isImage, setIsImage] = useState(false)
    const [image, setImage] = useState(null)
    const isNonMobileScreen = useMediaQuery('(min-width:1000px)')
    const dispatch = useDispatch()
    const medium = palette.neutral.medium
    const mediumMain = palette.neutral.mediumMain

    const handlePost = async () => {
        try {
            if (!_id || !post) {
                console.log("User ID or post content is missing.");
                return;
            }
            const formData = new FormData()
            formData.append('userId', _id)
            formData.append('description', post)
            if (image) {
                formData.append('picture', image)
                // formData.append('picturePath', image.name)
            }
            // Debugging: Check the contents of FormData

            setIsLoading(true)
            const { data } = await axios.post('post/create', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            console.log("data", data)
            dispatch(setPosts({ posts: data }))
            setPost('')
            setImage(null)
            setIsLoading(false)

        } catch (error) {
            console.log(error)
            setIsLoading(false)

        }
    }
    return (
        <WidgetWrapper>
            <FlexBetween gap={'1.5rem'}>
                <UserImage image={picturePath} />

                <InputBase
                    placeholder="what's in your mind?"
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                    sx={{
                        width: '100%',
                        padding: '1rem 2rem',
                        backgroundColor: palette.neutral.light,
                        borderRadius: '2rem'

                    }}
                />


            </FlexBetween>
            {isImage && (
                <Box border={`1px solid ${medium}`}
                    mt={'1rem'}
                    p={'1rem'}
                    borderRadius={'5px'}>
                    <Dropzone acceptedFiles=".jpg,.jpeg,.png"
                        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}>
                        {({ getRootProps, getInputProps }) => (
                            <FlexBetween>
                                <Box border={`1px dashed ${palette.primary.main}`}
                                    padding={'1rem'}
                                    {...getRootProps()}
                                    sx={{ '&:hover': { cursor: 'pointer' } }}>
                                    <input {...getInputProps()} />
                                    {!image ? (<p>Add image Here</p>) : (<FlexBetween><Typography>{image.name}</Typography>
                                        <Edit /></FlexBetween>)}
                                </Box>
                                {image && (
                                    <IconButton onClick={() => setImage(null)}
                                        sx={{
                                            width: '15%',
                                        }}

                                    >
                                        <DeleteOutline />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        )}
                    </Dropzone>

                </Box>
            )}
            <Divider sx={{ m: '1rem 0' }} />
            <FlexBetween>

                <FlexBetween gap={'0.25rem'} onClick={() => setIsImage(!isImage)} >
                    <ImageOutlined sx={{ color: mediumMain }} />
                    <Typography sx={{
                        color: mediumMain, '&:hover': {
                            color: medium, cursor: 'pointer'
                        }
                    }}>Image</Typography>
                </FlexBetween>
                {isNonMobileScreen ? <>
                    <FlexBetween gap={'0.25rem'} onClick={() => setIsImage(!isImage)} >
                        <GifBox sx={{ color: mediumMain }} />
                        <Typography sx={{
                            color: mediumMain, '&:hover': {
                                color: medium, cursor: 'pointer'
                            }
                        }}>Clip</Typography>
                    </FlexBetween>
                    <FlexBetween gap={'0.25rem'} onClick={() => setIsImage(!isImage)} >
                        <AttachFileOutlined sx={{ color: mediumMain }} />
                        <Typography sx={{
                            color: mediumMain, '&:hover': {
                                color: medium, cursor: 'pointer'
                            }
                        }}>Attach File</Typography>
                    </FlexBetween>
                    <FlexBetween gap={'0.25rem'} onClick={() => setIsImage(!isImage)} >
                        <MicOutlined sx={{ color: mediumMain }} />
                        <Typography sx={{
                            color: mediumMain, '&:hover': {
                                color: medium, cursor: 'pointer'
                            }
                        }}>Audio</Typography>
                    </FlexBetween>



                </> : <FlexBetween>
                    <MoreHorizOutlined sx={{ color: mediumMain }} />

                </FlexBetween>}
                <Button
                    disabled={!post || isLoading}
                    variant='contained'
                    onClick={handlePost}
                    sx={{

                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: '3rem'
                    }}
                >{isLoading ? "Loading" : "Post"}</Button>
            </FlexBetween>
        </WidgetWrapper>
    )
}

export default MyPostWidget