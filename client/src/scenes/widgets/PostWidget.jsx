import { useTheme } from '@emotion/react'
import { ChatBubbleOutline, ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, Send, ShareOutlined } from '@mui/icons-material'
import { Divider, IconButton, Typography, Box, InputBase } from '@mui/material'
import axios from 'axios'
import Friend from 'components/Friend'
import FlexBetween from 'components/flexBetween'
import WidgetWrapper from 'components/widgetWrapper'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePost } from 'state'



const PostWidget = ({
  postId,
  name,
  likes,
  comment,
  picturePath,
  PostuserId,
  location,
  userPicturePath,
  description
}) => {
  const dispatch = useDispatch()
  const userLoggedId = useSelector((state) => state.user._id)
  //const friendId = useSelector((state) => state.user.friends._id)
  const [isComment, setIsComment] = useState(false)
  const isLiked = Boolean(likes[userLoggedId])
  let countLikes = Object.keys(likes).length;
  const { palette } = useTheme()
  const primary = palette.primary.main
  const main = palette.neutral.main

  const patchLikes = async () => {

    const { data } = await axios.patch(`post/${postId}/like`, { userId: userLoggedId })
    dispatch(updatePost({ post: data }))
  }
  // const patchComment=async()=>{
  //   const {data}=await axios.patch(`http://localhost:4000/post/${postId}/comment`, { userId: userLoggedId })
  // }
  return (
    <WidgetWrapper>
      <Friend friendId={PostuserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath} />
      <Typography color={main}
        mt={'1rem'}>{description}</Typography>
      {picturePath && (<img
        height={'auto'}
        width={'100%'}
        alt='post'
        style={{ marginTop: '0.75rem', borderRadius: '2rem' }}
        src={`${process.env.REACT_APP_BASE_URL}assets/${picturePath}`}
      />)}
      <FlexBetween gap={'0.25rem'}>
        <FlexBetween gap={'1rem'}>
          <FlexBetween gap={'0.3rem'}>
            <IconButton onClick={patchLikes}>{

              isLiked ? <FavoriteOutlined sx={{ color: primary }} /> : <FavoriteBorderOutlined />
            }

            </IconButton>
            <Typography>{countLikes}</Typography>
          </FlexBetween>
          <FlexBetween gap={'0.3rem'}>
            <IconButton onClick={() => setIsComment(!isComment)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comment.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComment && (
        <Box >
          {comment.map((cmt, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, pl: '1rem', m: '0.5rem' }}>{cmt}</Typography>
            </Box>
          ))}
          <Typography >add comment</Typography>
          <FlexBetween> <InputBase sx={{ width: '72%' }} /><IconButton><Send /></IconButton></FlexBetween>
          <Divider />
        </Box>)
      }
    </WidgetWrapper >
  )
}

export default PostWidget