import React, { useState } from 'react'
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Face6Icon from '@mui/icons-material/Face6';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../redux/api';
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
    const [register] = useRegisterMutation();

    const registerUser = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', registerData.name);
        formData.append('email', registerData.email);
        formData.append('password', registerData.password);
        formData.append('avatar', avatar);
        console.log(avatar)
        dispatch(userSliceActions.setLoading(true)); // Set loading to true when the login process starts

        try {
            const response = await register({email, password, name, avatar}); // Assuming useLoginUserMutation is an async function

            if (response.data.success) {
                dispatch(userSliceActions.setLoading(false)); // Set loading to false after a successful login
                toast.success('Registered Successfully!');
                dispatch(userSliceActions.resetState());
                navigate('/login');
            } else {
                dispatch(userSliceActions.setLoading(false)); // Set loading to false if there's an error
                toast.error('Something went wrong');
            }
        } catch (error) {
            dispatch(userSliceActions.setLoading(false)); // Set loading to false in case of an exception
            toast.error('An error occurred while registering a user.');
        }
    };

    const handleAvatar = (event) => {
        let file = {};
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                const result = reader.result;
                file['data'] = result;
                console.log(file)
                setAvatarPreview(result);
            }
        }
        file['name'] = event.target.files[0].name;
        setAvatar(file);;
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
        loading ? <Loader /> : <div className='body'>
            {
                <form encType="multipart/form-data" className='form'>
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
                                value={''}
                                accept="image/*"
                                onChange={onInputChange} />
                            <span className="custom-file-label">Choose a file</span>
                        </label>
                    </div>
                    <button className='form-button' onClick={registerUser}>Sign Up</button>
                    <Link className='link' to={'/login'}>Already have an Account</Link>
                </form>
            }
        </div>
    )
}

export default Register