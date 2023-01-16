import React, { useEffect, useState } from 'react'
import "../styles/login.scss"
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/actions/authActions'
import {useNavigate} from "react-router-dom"

const Login = () => {

    const [userLogin,setUserLogin] = useState({})
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)
    const onChangeHandler = (e) => {
        setUserLogin({...userLogin,[e.target.name] : e.target.value})
    
    }
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(userLogin))
    }

    useEffect(() => {
        if(auth.token) {
            navigate("/")
        }
    },[auth,navigate])



  return (
    <div className='login__form'>
        <h1>Login</h1>
    <form onSubmit={submitHandler}>
        <div className="form__input">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" onChange={e => onChangeHandler(e)} />
        </div>
        <div className="form__input">
            <label htmlFor="password">
                Password
            </label>
            <input type="password" id="password" name="password" onChange={e => onChangeHandler(e)} />
        </div>

        <button className='btn' type="submit">Login</button>
    </form>

    </div>
  )
}

export default Login