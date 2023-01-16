import React, { useEffect } from 'react'
import {Link, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import UserProfile from '../components/profile/UserProfile';
import OtherProfile from '../components/profile/OtherProfile';
import Grid from '@material-ui/core/Grid';
import "../styles/profile.scss"
import { deleteBlog, getUserBlogs } from '../redux/actions/blogAction';
import "../styles/blog.scss"

const Profile = () => {
    const {id} = useParams();
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch()
    const blogUser = useSelector(state => state.blogUser)
    const auth = useSelector(state => state.auth)
    console.log(blogUser);
    useEffect(() => {
        if(!id) return ;
        if(blogUser.id !== id){
            dispatch(getUserBlogs(id))
        }
    },[id,dispatch,blogUser])

    const deleteHandler = (blog) => {
        dispatch(deleteBlog(blog,auth))
    }

  return (
    <div className='profile'>
        <Grid container spacing={2}>
            <Grid item lg={4} md={5} xs={12}>
            {
            user?._id === id ? <UserProfile /> : <OtherProfile id={id}  />
            }
            </Grid>
            <Grid item lg={8} md={7} xs={12}>
                <h1> Blogs</h1>
                {
                    blogUser?.blogs?.map(blog => (
                        <div className='preview'>
                            <Grid container spacing={2}>
                                <Grid item md={5} className="thumbnail">
                                {
                                blog?.thumbnail && 
                                <>
                                    {
                                    typeof(blog.thumbnail) === 'string'
                                    ? <Link to={`/blogs/${blog._id}`}>
                                        <img src={blog.thumbnail} 
                                        alt="thumbnail"  />
                                    </Link>
                                    :<img src={URL.createObjectURL(blog?.thumbnail)} 
                                    alt="thumbnail" />
                                    }
                                </>
                                }
                                </Grid>
                                <Grid item md={7}>
                                    <div className="card">
                                    <h5>{blog?.title}</h5>
                                    <p>{blog?.description}</p>
                                    {
                                        blog.user._id === auth.user?._id && <Link to={`/blog/update_blog/${blog._id}`} style={{ textDecoration:"none" , color:'blue',marginTop:"15px",display:"inline-block",marginRight:"10px" }}><span>Edit</span></Link>
                                    }
                                    {
                                        blog.user._id === auth.user?._id && <span style={{ textDecoration:"none" , color:'red',marginTop:"15px",display:"inline-block",marginRight:"10px" }} onClick={() => deleteHandler(blog)}>Delete</span>
                                    }  
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    ))
                }
            </Grid>
        </Grid>
        
    </div>
  )
}

export default Profile