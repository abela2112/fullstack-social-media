import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setPosts } from 'state'
import PostWidget from './PostWidget'


const PostsWidget = ({ userId, isProfile = false }) => {
    const posts = useSelector((state) => state.posts)
    const dispatch = useDispatch()

    console.log(isProfile)
    const getUserPosts = () => {
        axios.get(`post/user/${userId}`).then(({ data }) => {
            console.log(data)
            dispatch(setPosts({ posts: data }))
        })

    }
    const getPosts = () => {
        axios.get(`post`).then(({ data }) => { dispatch(setPosts({ posts: data })) })

    }
    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, [isProfile])
    return (
        <>{posts?.length > 0 && posts.map(({
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

        ))}</>
    )
}

export default PostsWidget