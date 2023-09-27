import React from 'react'
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './form.css';

const Login = () => {
    return (
        <div className='body'>
            <div className='form'>
                <h1 className="form-title sign-in">Sign In</h1>
                <div className="form-control">
                    <span><AlternateEmailOutlinedIcon sx={{marginRight: '5px'}} /></span>
                    <input type="text" name='email' placeholder='Email' />
                </div>
                <div className="form-control">
                    <span><LockOutlinedIcon sx={{marginRight: '5px'}} /></span>
                    <input type="password" name='password' placeholder='Password' />
                </div>
                <a href="#">Forgot Your Password ?</a>
                <button onClick={() => false}>Sign In</button>
            </div>
        </div>
    )
}

export default Login