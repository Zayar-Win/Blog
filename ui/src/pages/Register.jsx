import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { register } from '../redux/actions/authActions';

const Register = () => {
  const dispatch = useDispatch()
  const [userRegister,setUserRegister] = useState({});

  const changeHandler = (e) => {
    setUserRegister({...userRegister,[e.target.name] : e.target.value})
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(userRegister))
  }

  return (
    <div className='login__form'>
        <h1>Register</h1>
    <form onSubmit={submitHandler}>

        <div className="form__input">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" onChange={e => changeHandler(e)} />
        </div>
        <div className="form__input">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" onChange={e => changeHandler(e)} />
        </div>
        <div className="form__input">
            <label htmlFor="password">
                Password
            </label>
            <input type="password" id="password" name="password" onChange={e => changeHandler(e)} />
        </div>
        <div className="form__input">
            <label htmlFor="confirmPassword">
                ConfirmPassword
            </label>
            <input type="password" id="confirmPassword" name="confirmPassword" onChange={e => changeHandler(e)} />
        </div>

        <button className='btn' type="submit">Register</button>
    </form>

    </div>
  )
  
}

export default Register