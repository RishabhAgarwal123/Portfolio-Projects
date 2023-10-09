import React, { useState } from 'react'
import './User.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import Loader from '../Loader';

const Login = () => {
    const navigate = useNavigate();
    const { isLoading, setIsLoading, setUserDetail, setAuthenticated } = useContext(UserContext);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginUser = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const {data} = await axios.post('/user/login', { email, password });
            if (data.success) {
                const { user } = data;
                setUserDetail(user);
                navigate('/')
                setAuthenticated(true);
                toast.success("User Logged In Success");
            } else {
                toast.error(data.message);
                navigate('/')
            }
            setIsLoading(false);
        } catch (error) {
            toast.error('Login failed!');
            setIsLoading(false);
            setAuthenticated(false);
        }
    }

    return (
        <>
            {
                isLoading ? <Loader /> : <form className="form" onSubmit={loginUser}>
                    <p className="form-title">Sign in to your account</p>
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
                        Login
                    </button>
                    <p className="signup-link">
                        No account?
                        <Link to='/register'> Sign Up</Link>
                    </p>
                </form>
            }
        </>
    )
}

export default Login