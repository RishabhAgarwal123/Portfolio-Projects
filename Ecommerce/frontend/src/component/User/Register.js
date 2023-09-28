import React, { useState } from 'react'
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Face6Icon from '@mui/icons-material/Face6';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../../redux/api';
import { useDispatch, useSelector } from 'react-redux';
import { userSliceActions } from '../../redux/slices/userSlice';
import { toast } from 'react-toastify';
import Loader from '../layout/Loader/Loader';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector(state => state.user);
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState('https://cdn1.iconfinder.com/data/icons/material-core/20/account-circle-1024.png');
    const { name, email, password } = registerData;
    const { isLoading, mutate: register } = useRegisterUserMutation();

    const registerUser = async (event) => {
        event.preventDefault();

        const myForm = new FormData();
        myForm.set('name', name);
        myForm.set('email', email);
        myForm.set('password', password);
        myForm.set('avatar', avatar);

        dispatch(userSliceActions.setLoading(true)); // Set loading to true when the login process starts

        try {
            if (!isLoading) {
                const response = await register({ name, email, password, avatar }); // Assuming useLoginUserMutation is an async function

                if (response.error) {
                    dispatch(userSliceActions.setLoading(false)); // Set loading to false if there's an error
                    toast.error(response.error.message);
                } else {
                    dispatch(userSliceActions.setLoading(false)); // Set loading to false after a successful login
                    toast.success('Registered Successfully!');
                    dispatch(userSliceActions.resetState());
                    navigate('/login');
                }
            }
        } catch (error) {
            dispatch(userSliceActions.setLoading(false)); // Set loading to false in case of an exception
            toast.error('An error occurred while logging in.');
        }
    };

    const handleAvatar = (event) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                const result = reader.result;
                setAvatarPreview(result);
                setAvatar(result);
            }
        }
        reader.readAsDataURL(event.target.files[0]);
    }

    const onInputChange = (e) => {
        if (e.target.name === 'avatar') {
            handleAvatar(e);
        } else {
            setRegisterData({
                ...registerData,
                [e.target.name]: e.target.value
            });
        }
    }

    return (
        <div className='body'>
            {
                loading ? <Loader /> : <div className='form'>
                    <h1 className="form-title sign-in">Sign Up</h1>
                    <div className="form-control">
                        <span><Face6Icon sx={{ marginRight: '5px' }} /></span>
                        <input
                            type="text"
                            name='name'
                            placeholder='Name'
                            value={name || ''}
                            onChange={onInputChange}
                            required />
                    </div>
                    <div className="form-control">
                        <span><AlternateEmailOutlinedIcon sx={{ marginRight: '5px' }} /></span>
                        <input
                            type="text"
                            name='email'
                            placeholder='Email'
                            value={email || ''}
                            onChange={onInputChange}
                            required />
                    </div>
                    <div className="form-control">
                        <span><LockOutlinedIcon sx={{ marginRight: '5px' }} /></span>
                        <input
                            type="password"
                            name='password'
                            placeholder='Password'
                            value={password || ''}
                            onChange={onInputChange}
                            required />
                    </div>
                    <div className='upload'>
                        <img alt='Avatar Preview' src={avatarPreview} />
                        <label className="custom-file-input">
                            <input
                                type="file"
                                name="avatar"
                                value={avatar || ''}
                                accept="image/*"
                                onChange={onInputChange} />
                            <span className="custom-file-label">Choose a file</span>
                        </label>
                    </div>
                    <button className='form-button' onClick={registerUser}>Sign Up</button>
                    <Link className='link' to={'/login'}>Already have an Account</Link>
                </div>
            }
        </div>
    )
}

export default Register