import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useParams} from 'react-router-dom'
import { format } from 'timeago.js'
import Comment from '../components/comment/Comment'
import Input from '../components/comment/Input'
import { getBlogDetails } from '../redux/actions/blogAction'
import { createComment, getComments } from '../redux/actions/commentAction'
import "../styles/blogDetails.scss"

const BlogDetails = () => {
    const {id} = useParams()
    const [showComment,setShowComment] = useState([])
    const blog = useSelector(state => state.blogDetail)
    const comments = useSelector(state => state.comment)
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const socket = useSelector(state => state.socket);

    useEffect(() => {
        if(!id || !socket) return;

        socket.emit("JoinRoom",id)

        return () => {
            socket.emit("OutRoom",id)
        }

    } ,[id,socket])

    const commentHandler = (body) => {
        const data = {
            user : auth.user,
            content : body,
            blog_id : blog._id,
            blog_user_id : blog.user._id,
        }

        setShowComment([data,...showComment])
        dispatch(createComment(data,auth))
    }

    useEffect(() => {
        if(!blog._id) return ;
        dispatch(getComments(blog._id))
    },[blog._id,dispatch])

    useEffect(() => {
        if(!comments.comments) return;
        setShowComment(comments.comments)
    },[comments.comments])
    
    useEffect(() => {
        if(!id) return;
        dispatch(getBlogDetails(id))
    },[id,dispatch])
  return (
    <div className='blog__detail'>
        <h2>{blog?.title}</h2>
        <div className="user_info">
            <div className="image">
                <img src={blog?.user?.avatar} alt="" />
                <div className="span">
                    <p>{blog?.user?.name}</p>
                    {blog?.user && <span>Joined at {format(blog?.user?.createdAt)}</span>}
                </div>
            </div>
            <div className="time">
               {blog?.user &&  <span>Posted at - {format(blog?.createdAt)}</span>}
            </div>
        </div>
        <div className="thumbnail">
            <img src={blog?.thumbnail} alt="" />
        </div>
        <p>{blog.description}</p>

        <div dangerouslySetInnerHTML={{ __html : blog?.content }} />
        <hr style={{ border:".1px solid rgba(0,0,0,0.4)" }} />
        <h3 style={{ fontWeight:"400" , fontSize:17 }}>Comments</h3>
        {
            auth.user ? <Input auth={auth} callback={commentHandler} /> : <span>Please Login to comment.</span>
        }

        {
            showComment.map((comment,index) => (
                <Comment key={index} comment={comment} />
            ))
        }

    </div>
  )
}

export default BlogDetails