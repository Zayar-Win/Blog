import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOtherUserInfo } from '../../redux/actions/profileActions';
import {format} from 'timeago.js'

const OtherProfile = ({id}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.otherUserInfo)
  useEffect(() => {
    if(!id) return;
    dispatch(getOtherUserInfo(id))
  },[id,dispatch])
  return (
    <div className='profile__card'>
        <h2>Profile</h2>
        <div className="image">
        <div className="edit">
        <img src={ user?.avatar} alt="" />
        </div>
        </div>
        <span>{user?.name }</span>
        <span>{user?.email}</span>
        <span>Joined our team at {format(user?.createdAt)}</span>
    </div>
  )
}

export default OtherProfile