import React from 'react'
import './form.css';

const Login = () => {
    return (
        <form action="">
            <h1 className="form-title sign-in">Sign In</h1>
            <div className="form-control">
                <input type="text" />
                <label htmlFor="email">Email</label>
            </div>
            <div className="form-control">
                <input type="password" />
                <label htmlFor="password">Password</label>
            </div>
            <a href="#">Forgot Your Password ?</a>
            <button onClick={() => false}>Sign In</button>
        </form>
    )
}

export default Login