import React, { useEffect, useState } from 'react'
import { format } from 'timeago.js'
import Input from './Input'
import {useDispatch, useSelector} from 'react-redux'
import { commentUpdate, deleteComment, replyComment } from '../../redux/actions/commentAction'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


const Comment = ({comment}) => {
    const auth = useSelector(state => state.auth)
    const [openReplybox, setOpenReplybox] = useState(false)
    const [showReply,setShowReply] = useState([])
    const dispatch = useDispatch()
    const [edit ,setEdit] = useState(false)
    const [updateComment,setUpdateComment] = useState();

    const replyHandler = (body) => {
        const data = {
            user:auth.user,
            blog_id : comment.blog_id,
            blog_user_id : comment.blog_user_id,
            comment_root : comment.comment_root ||  comment._id,
            reply_user : comment.user,
            content : body,
        }
        setShowReply([data,...showReply])
        dispatch(replyComment(data,auth))
        setOpenReplybox(false)
    }

    const updateHandler = (body) => {
        if(!auth) return ;
        if(updateComment.content === body) {
            return
        }
        const newComment = {...updateComment,content : body}
        dispatch(commentUpdate(newComment,auth))
        setEdit(false)
    }


    useEffect(() => {
        if(!comment.replyComment) return;
        setShowReply(comment.replyComment)
        
    } , [comment])

    const updateClick = (comment) => {
        setUpdateComment(comment);
        setEdit(!edit)
    }

    const deleteHandler = (comment) => {
        dispatch(deleteComment(comment,auth))
    }


  return (
    <>
        <div className='comment__container'>
            <div className="image">
                <img src={comment.user.avatar} alt="" />
            </div>
            <div className="user__info">
                <div className="info">
                    <span>{comment.user.name}</span>
                    <span className='time'>{format(comment.createdAt)}</span>
                </div>
                <div className="content">
                    <p>{comment.content}</p>
                </div>
                
                <span onClick={() => setOpenReplybox(!openReplybox)}> {openReplybox ? "- cancel -" : "- reply - "}  </span>    
            </div>
            <div className="option">
                {
                    comment.blog_user_id === auth.user._id ?
                     comment.user._id === auth.user._id ?
                      <><EditIcon className="icon" onClick={ ()=>updateClick(comment)} />
                    <DeleteIcon className="icon" onClick={() => deleteHandler(comment)} /></>
                     : 
                     <DeleteIcon className='icon' onClick={() => deleteHandler(comment)} />  
                     : 
                     comment.user.id === auth.user._id && <>
                    <EditIcon className="icon" onClick={ ()=>updateClick(comment)} />
                    <DeleteIcon className="icon" onClick={ () => deleteHandler(comment)} />
                    </>
                }
                
            </div>        
        </div>
      
    
    {
        (openReplybox || edit)  && <Input auth={auth} type={edit ? "Update" : "Reply"} comment={edit ? updateComment.content : null} callback={edit ? updateHandler : replyHandler} /> 
    }

    {
        showReply?.map(reply => (
            <div className='comment__container' key={reply._id}>
                <div className="image">
                    <img src={reply?.user?.avatar} alt="" />
                </div>
                <div className="user__info">
                    <div className="info">
                        <span>{reply?.user?.name} reply to {reply?.reply_user?.name}</span>
                        <span className='time'>{format(comment.createdAt)}</span>
                    </div>
                    <div className="content">
                        <p>{reply?.content}</p>
                    </div>
                </div>
                         
            </div>
        ))
    }

    </>
  )
}

export default Comment