import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setPosts, setUserPosts } from 'state'
import PostWidget from './PostWidget'


const PostsWidget = ({ userId, isProfile = false }) => {
    const posts = useSelector((state) => isProfile ? state.auth.userPosts : state.auth.posts) 
    const dispatch = useDispatch()
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
    return (

        <>
            {isLoading && <p>Loading...</p>}

            {posts?.length > 0 ? posts.map(({
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

            )) : <p>No posts</p>}</>
    )
}

export default PostsWidget