import React from 'react'
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <>
            <form className="form">
                <p className="form-title">Sign up to your account</p>
                <div className="input-container">
                    <input type="name" placeholder="Enter name" />
                </div>
                <div className="input-container">
                    <input type="email" placeholder="Enter email" />
                </div>
                <div className="input-container">
                    <input type="password" placeholder="Enter password" />
                </div>
                <button type="submit" className="submit">
                    Register
                </button>
                <p className="signup-link">
                    Already have an account?
                    <Link to='/login'> Sign In</Link>
                </p>
            </form>
        </>
    )
}

export default Register