import React from 'react'

const Register = () => {
    return (
        <div className="form-container sign-in-container">
            <form action="">
                <h1 className="form-title sign-in">Sign In</h1>
                <div className="form-control">
                    <input type="text" required />
                    <label for="email">Email</label>
                </div>
                <div className="form-control">
                    <input type="password" required />
                    <label for="password">Password</label>
                </div>
                <a href="#">Forgot Your Password ?</a>
                <button onclick="return false;">Sign In</button>
            </form>
        </div>
    )
}

export default Register