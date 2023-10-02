import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../Loader';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../UserContext';

const Register = () => {
    const { isLoading, setIsLoading, setUserDetail, setAuthenticated, authenticated } = useContext(UserContext);
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const registerUser = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { data } = await axios.post('/user/register', { username, email, password });
            if (data?.success) {
                const { user } = data;
                setUserDetail(user);
                setAuthenticated(true);
                navigate('home');
                toast.success('User Registered Succesfully!')
            }
            setIsLoading(false);
            toast.error('User not registered!');
        } catch (error) {
            toast.error('Something went wrong!');
            setIsLoading(false);
        }
    }

    return (
        <>
            {isLoading ? <Loader /> : <form className="form" onSubmit={registerUser}>
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
                    <Link to='/'> Sign In</Link>
                </p>
            </form>}
        </>
    )
}

export default Register