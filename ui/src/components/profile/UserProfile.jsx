import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import updateUser, { resetPassword } from '../../redux/actions/profileActions';

const UserProfile = () => {
    const [name,setName] = useState();
    const [avatar,setAvatar] = useState();
    const user = useSelector(state => state.auth.user)
    const auth = useSelector(state => state.auth)
    const [password,setPassword] = useState()
    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault();
        if(name || avatar) {
            dispatch(updateUser(name,avatar,auth))
        }
        if(password && auth.token) {
            dispatch(resetPassword(password,auth.token))
        }
    }

  return (
    <div className='profile__card'>
        <h2>Profile</h2>
        <div className="image">
        <div className="edit">
        <img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} alt="" />
        <label htmlFor="image"><PhotoCameraIcon /></label>
        <input type="file" id="image" style={{ display:"none" }} onChange={e => setAvatar(e.target.files[0])} />
        </div>
        </div>
        <span>{auth?.user.name}</span>
        <form action="" onSubmit={submitHandler}>
        <div className='profile__form'>
            <label htmlFor="name">Name</label>
            <input type="text" defaultValue={user?.name} onChange={e => setName(e.target.value)} />
        </div>
        <div className='profile__form'>
            <label htmlFor="email">Email</label>
            <input type="email" value={user?.email} disabled={true} />
        </div>
        <div className='profile__form'>
            <label htmlFor="password">Password</label>
            <input type="password" onChange={e => setPassword(e.target.value)} />
        </div>
        <button className='btn' type="submit">Update</button>
        </form>
    </div>
  )
}

export default UserProfile