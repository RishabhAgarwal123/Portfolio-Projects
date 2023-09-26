import React from 'react'

const Register = () => {
    return (
        <form action="">
        <h1 className="form-title sign-up">Sign Up</h1>
        <div className="form-control">
            <input type="text" />
            <label htmlFor="email">Email</label>
        </div>
        <div className="form-control">
            <input type="password" />
            <label htmlFor="password">Password</label>
        </div>
        <button onClick={() => false}>Sign Up</button>
    </form>
    )
}

export default Register