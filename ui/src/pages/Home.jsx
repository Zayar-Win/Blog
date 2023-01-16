import React from 'react'
import { useSelector } from 'react-redux'
import {Grid} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import {Link, useNavigate} from "react-router-dom"
import Typography from '@material-ui/core/Typography';

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
    padding:"10px 40px",
  },
  category : {
    fontSize:"18px",
    textTransform:"capitalize",
    marginRight:"10px"
  }
});

const Home = () => {
  const blogs = useSelector(state => state.blog.blogs)
  const navigate = useNavigate()
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {
        blogs?.map(blogsByCategory => (
          <div key={blogsByCategory._id}>
            <h4>Group by <Link to={`/categories/${blogsByCategory.name}`} style={{ textDecoration:"none" , color:"black" }}><span className={classes.category}>{blogsByCategory.name}</span></Link>({blogsByCategory.count})</h4>
            <Grid container spacing={2}>
              {
                blogsByCategory.blogs.map(blog => (
                  <Grid item md={3}>
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
          </div>
        ))
      }
    </div>
  )
}

export default Home