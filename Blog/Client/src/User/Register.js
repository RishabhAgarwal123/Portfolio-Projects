import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const registerUser = () => {
        
    }

    return (
        <>
            <form className="form" onSubmit={registerUser}>
                <p className="form-title">Sign up to your account</p>
                <div className="input-container">
                    <input
                        type="name"
                        placeholder="Enter name"
                        value={username || ''}
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="input-container">
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email || ''}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input-container">
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password || ''}
                        onChange={(e) => setPassword(e.target.value)} />
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