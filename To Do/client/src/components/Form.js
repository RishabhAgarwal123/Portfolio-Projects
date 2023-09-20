import TextField from '@mui/material/TextField';
import { useState } from 'react';
import axios from "axios";

const Form = () => {
    const [formType, setFormtype] = useState('login');
    const [formValues, setFormValues] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });
    const [loginData, setLoginData] = useState({ email: '', password: '' });

    const handleRegister = (event) => {
        event.preventDefault();
        const registerData = {
            name: `${formValues.firstname} ${formValues.lastname}`,
            email: formValues.email,
            password: formValues.password
        }
        axios.post("/users/register", registerData).then((response) => {
            console.log(response)
        })
    }

    const handleLogin = (event) => {
        event.preventDefault();
        console.log(loginData)
    }

    const handleLoginInputChange = (event) => {
        const { id, value } = event.target;
        setLoginData((prev) => ({
            ...prev,
            [id]: value,
        }));
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    return (
        <>
            <div className='center'>
                {formType === 'register' && <form className='form' onSubmit={(e) => handleRegister(e)}>
                    <p className='title'>Register</p>
                    <p className='message'>Signup now and get full access to our app. </p>
                    <div className='margin-top-1'>
                        <TextField
                            variant='outlined'
                            id='firstname'
                            label='Firstname'
                            className='w-100'
                            value={formValues.firstname}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className='margin-top-1'>
                        <TextField
                            variant='outlined'
                            id='lastname'
                            label='Lastname'
                            className='w-100'
                            value={formValues.lastname}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className='margin-top-1'>
                        <TextField
                            variant='outlined'
                            id='email'
                            label='Email'
                            className='w-100'
                            value={formValues.email}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className='margin-top-1'>
                        <TextField
                            variant='outlined'
                            id='password'
                            label='Password'
                            className='w-100'
                            type='password'
                            value={formValues.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button className='submit' type='submit'>Register</button>
                    <p className="signin">Already have an acount ?
                        <a style={{ cursor: 'pointer' }} onClick={() => setFormtype('login')}> Log In</a> </p>
                </form>}

                {/* Login */}
                {
                    formType === 'login' && <form className='form' onSubmit={(e) => handleLogin(e)}>
                        <p className='title'>Login</p>
                        <p className='message'>Sign In. </p>
                        <div className='margin-top-1'>
                            <TextField
                                variant='outlined'
                                id='email'
                                label='Email'
                                className='w-100'
                                type='email'
                                value={loginData.email}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className='margin-top-1'>
                            <TextField
                                variant='outlined'
                                id='password'
                                label='Password'
                                className='w-100'
                                type='password'
                                value={loginData.password}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <button className='submit' type='submit'>Log In</button>
                        <p className="signin">Create an acount ?
                            <a style={{ cursor: 'pointer' }} onClick={() => setFormtype('register')}> Sign Up</a> </p>
                    </form>
                }
            </div>
        </>
    )
}

export default Form