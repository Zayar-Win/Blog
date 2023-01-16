import React, { useEffect, useState } from 'react'
import '../styles/createblog.scss'
import Quill from '../components/Quill'
import CreateForm from '../components/card/CreateForm'
import PreviewCard from '../components/card/PreviewCard'
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux'
import { createBlog, getBlogDetails, updateBlog } from '../redux/actions/blogAction'
import { useNavigate } from 'react-router-dom'

const CreateBlog = ({id}) => {

  const initState = {
    title: '',
    content: '',
    description: '',
    thumbnail: '',
    category: '',
  }
  const auth = useSelector(state => state.auth)
  const [blog,setBlog] = useState(initState);
  const blogData = useSelector(state => state.blogDetail)
  const [body,setBody] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    if(!id)return ;
    dispatch(getBlogDetails(id))
  },[id,dispatch])

  useEffect(() => {
    if(!blogData._id) return;
    setBlog(blogData)
    setBody(blogData.content)
  },[blogData])


  const createPost = (e) => {
    e.preventDefault();
    const blogData = {...blog,content : body};
    if(id) {
      dispatch(updateBlog(blogData,auth))
    }else{
      dispatch(createBlog(blogData,auth))
    }
    navigate("/blogs/" + id)
  }

  return (
    <div className='blog__container'>
      <h2>Create Your own Blog</h2>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <CreateForm setBlog={setBlog} blog={blog} />
        </Grid>
        <Grid item md={6}>
          <PreviewCard blog={blog} />
        </Grid>
      </Grid>
      <Quill setBody={setBody} blog={blog} body={body} /> 
      <button className='btn' onClick={(e) => createPost(e)}>{id ? "Update" : "Create"}</button>
    </div>
  )
}

export default CreateBlog