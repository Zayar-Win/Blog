import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import {useNavigate , useLocation} from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * ': {
      marginTop: theme.spacing(2),
    },
  },
}));

const BlogPagination = ({total,callback}) => {
    const classes = useStyles();
    const [page,setPage] = useState(1)
    const location = useLocation();
    const navigate = useNavigate()
    const paginationHandler = (e,value) => {
        navigate(`?page=${value}`)
        callback(value)
    }

    useEffect(() => {
        const num = location.search.slice(6) || 1;
        setPage(Number(num))
    },[location.search])
  return (
    <div>
        <div className={classes.root}>
            <Pagination page={page} count={total} onChange={paginationHandler} />
        </div>
    </div>
  )
}

export default BlogPagination