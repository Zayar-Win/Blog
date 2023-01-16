import { Button, Card, CardActionArea, CardActions, CardContent, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import BlogPagination from '../components/Pagination';
import { blogsByCategory } from '../redux/actions/blogAction';

const useStyles = makeStyles({
    root: {
      maxWidth: 500,
    },
    media: {
      height: 200,
      width:"100%",
      objectFit:"cover"
    },
    card__img:{
      width:"100%",
      height:"220px",
      textAlign:"center"
    },
    img:{
      width:"80%",
      height:"100%",
    },
    container:{
      maxWidth:1400,
      margin:"0 auto",
      padding:"40px 40px",
    },
    category : {
      fontSize:"18px",
      textTransform:"capitalize",
      marginRight:"10px"
    }
  });

const Blogs = () => {
    const categories = useSelector(state => state.category.categories)
    const blogsCategory = useSelector(state => state.blogsCategory)
    const {category} = useParams();
    const classes = useStyles();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [currentCategory,setCurrentCategory] = useState();
    const [blogs,setBlogs] = useState([])
    const [total,setTotal] = useState(0)
    const {search} = useLocation()
    useEffect(() => {
        const isCategory  = categories?.find(item => item.name === category)
        if(isCategory) setCurrentCategory(isCategory)
    },[categories,category])

    useEffect(() => {
        if(!currentCategory) return;
        if(blogsCategory.id !== currentCategory._id){
            dispatch(blogsByCategory(currentCategory,search))
        }
        setBlogs(blogsCategory.blogs)
        setTotal(blogsCategory.total)
    } , [currentCategory,dispatch,blogsCategory,search])

    const handlePagination = (num) => {
      const search = `?page=${num}`
      dispatch(blogsByCategory(currentCategory,search))
    }


  return (
    <div className={classes.container}>
        <Grid container spacing={2}>
              {
                blogs?.map(blog => (
                  <Grid item md={3} key={blog._id}>
                    <Card className={classes.root}>
                      <CardActionArea>
                        <Link to={`/blogs/${blog._id}`}>
                        <div className={classes.card__img}>
                          <img src={blog.thumbnail} alt="" className={classes.img} />
                        </div></Link>
                        <CardContent>
                          <Link to={`/profile/${blog.user._id}`} style={{ textDecoration:"none",color:"black" }}>
                          <Typography>
                            By <span style={{ color:"rgba(0,0,0,0.7)" , textDecoration:"underline" }}>{blog?.user?.name}</span>
                          </Typography>
                          </Link>
                          <Typography gutterBottom variant="h5" component="h2">
                            {blog.title}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                            {blog.description.length > 100 ? blog.description.slice(0,100) + "..." : blog.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button size="small" color="primary">
                          Share
                        </Button>
                        <Button size="small" color="primary" onClick={() => navigate(`/blogs/${blog._id}`)}>
                          Learn More
                        </Button>
                      </CardActions>
                  </Card>
                  </Grid>
                ))
              }
            </Grid>
          {
            total > 1 && <BlogPagination total={total} callback={handlePagination} />
          }
    </div>
  )
}

export default Blogs