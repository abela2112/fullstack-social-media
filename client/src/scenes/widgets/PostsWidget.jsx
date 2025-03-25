import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setPosts, setUserPosts } from 'state'
import PostWidget from './PostWidget'
import WidgetWrapper from 'components/widgetWrapper'
import { Typography } from '@mui/material'


const PostsWidget = ({ userId, isProfile = false, searchQuery }) => {
    const posts = useSelector((state) => isProfile ? state.auth.userPosts : state.auth.posts) 
    const dispatch = useDispatch()
    const [filteredPosts, setFilteredPosts] = useState([])
    const [post, setPost] = useState(posts)
    const [isLoading, setIsoading] = useState(false)
    console.log(isProfile)
    const getUserPosts = () => {
        axios.get(`post/user/${userId}`).then(({ data }) => {
            console.log(data)
            dispatch(setUserPosts({ posts: data }))
        })

    }
    const getPosts = () => {
        axios.get(`post`).then(({ data }) => { dispatch(setPosts({ posts: data })) })

    }
    useEffect(() => {
        setIsoading(true)
        isProfile ? getUserPosts() : getPosts()
        setIsoading(false)

    }, [isProfile])

    useEffect(() => {
        if (searchQuery === '') {
            setPost(posts)
        }
        if (!searchQuery) return
        setFilteredPosts(posts?.filter(post =>
            post.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.description.toLowerCase().includes(searchQuery.toLowerCase())))

        setPost(filteredPosts)


    }, [searchQuery])
    return (

        <>
            {isLoading && <p>Loading...</p>}

            {post?.length > 0 ? post.map(({
            _id,
            firstName,
            lastName,
            likes,
            comment,
            picturePath,
            userId,
            location,
            description,
            userPicturePath
        }) => (
            <PostWidget
                key={_id}
                postId={_id}
                name={`${firstName}${lastName} `}
                likes={likes}
                comment={comment}
                picturePath={picturePath}
                PostuserId={userId}
                location={location}
                userPicturePath={userPicturePath}
                description={description} />

            )) :

                <WidgetWrapper>
                    <Typography variant='h6' color='textSecondary' align='center'>No posts</Typography>
                </WidgetWrapper>}</>
    )
}

export default PostsWidget