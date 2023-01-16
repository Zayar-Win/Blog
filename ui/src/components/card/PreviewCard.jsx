import { Grid, Link } from '@material-ui/core'
import React from 'react'

const PreviewCard = ({blog}) => {
  return (
    <div className='preview'>
        <Grid container spacing={2}>
            <Grid item md={5} className="thumbnail">
            {
            blog?.thumbnail && 
            <>
              {
                typeof(blog.thumbnail) === 'string'
                ? <Link to={`/blog/${blog._id}`}>
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
                </div>
            </Grid>
        </Grid>
    </div>
  )
}

export default PreviewCard