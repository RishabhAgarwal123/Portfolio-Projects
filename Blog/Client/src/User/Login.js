import React from 'react'
import './User.css';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <>
            <form className="form">
                <p className="form-title">Sign in to your account</p>
                <div className="input-container">
                    <input type="email" placeholder="Enter email" />
                        <span>
                        </span>
                </div>
                <div className="input-container">
                    <input type="password" placeholder="Enter password" />
                </div>
                <button type="submit" className="submit">
                    Login
                </button>
                <p className="signup-link">
                    No account?
                    <Link to='/register'> Sign Up</Link>
                </p>
            </form>
        </>
    )
}

export default Login