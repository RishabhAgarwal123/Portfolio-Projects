import React, { useState } from 'react'
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';
import './form.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginUserMutation } from '../../redux/api';
import { userSliceActions } from '../../redux/slices/userSlice';
import { toast } from 'react-toastify';
import Loader from '../layout/Loader/Loader';

const Login = () => {
    const dispatch = useDispatch();
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const { email, password } = loginData;
    const { loading } = useSelector(state => state.user);
    const { isLoading, mutate: login } = useLoginUserMutation();

    const onInputChange = (e) => {
        e.preventDefault();
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    }

    const loginUser = async (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set('email', email);
        myForm.set('password', password);
        dispatch(userSliceActions.setLoading(true)); // Set loading to true when the login process starts

        try {
            if (!isLoading) {
                const response = await login({ email, password }); // Assuming useLoginUserMutation is an async function

                if (response.error) {
                    dispatch(userSliceActions.setLoading(false)); // Set loading to false if there's an error
                    toast.error(response.error.message);
                } else {
                    const user = response.data; // Get the user data from the response
                    dispatch(userSliceActions.setLoading(false)); // Set loading to false after a successful login
                    toast.success('Logged In Successfully!');
                    dispatch(userSliceActions.setUser(user)); // Set the user in your Redux store
                }
            }
        } catch (error) {
            dispatch(userSliceActions.setLoading(false)); // Set loading to false in case of an exception
            toast.error('An error occurred while logging in.');
        }
    };

    return (
        <div className='body'>
            {
                loading ? <Loader /> : <div className='form'>
                    <h1 className="form-title sign-in">Sign In</h1>
                    <div className="form-control">
                        <span><AlternateEmailOutlinedIcon sx={{ marginRight: '5px' }} /></span>
                        <input
                            type="text"
                            name='email'
                            placeholder='Email'
                            value={email || ''}
                            onChange={onInputChange} />
                    </div>
                    <div className="form-control">
                        <span><LockOutlinedIcon sx={{ marginRight: '5px' }} /></span>
                        <input
                            type="password"
                            name='password'
                            placeholder='Password'
                            value={password || ''}
                            onChange={onInputChange} />
                    </div>
                    <Link style={{ borderBottom: '0' }} className='link' to={"/"}>Forgot Your Password ?</Link>
                    <button onClick={loginUser}>Sign In</button>
                    <Link className='link' to={'/register'}>Create a new Account</Link>
                </div>
            }
        </div>
    )
}

export default Login