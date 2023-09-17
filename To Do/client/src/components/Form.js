import TextField from '@mui/material/TextField';
import { useState } from 'react';

const Form = () => {
    const [formType, setFormtype] = useState('login');
    return (
        <>
            <div className='center'>
                {formType === 'register' && <form className='form'>
                    <p className='title'>Register</p>
                    <p className='message'>Signup now and get full access to our app. </p>
                    <div className='margin-top-1'>
                        <TextField
                            variant='outlined'
                            id='firstname'
                            label='Firstname'
                            className='w-100'
                        />
                    </div>

                    <div className='margin-top-1'>
                        <TextField
                            variant='outlined'
                            id='lastname'
                            label='Lastname'
                            className='w-100'
                        />
                    </div>

                    <div className='margin-top-1'>
                        <TextField
                            variant='outlined'
                            id='email'
                            label='Email'
                            className='w-100'
                        />
                    </div>
                    <div className='margin-top-1'>
                        <TextField
                            variant='outlined'
                            id='password'
                            label='Password'
                            className='w-100'
                        />
                    </div>
                    <button className='submit'>Register</button>
                    <p className="signin">Already have an acount ?
                        <a style={{ cursor: 'pointer' }} onClick={() => setFormtype('login')}> Log In</a> </p>
                </form>}

                {/* Login */}
                {
                    formType === 'login' && <form className='form'>
                        <p className='title'>Login</p>
                        <p className='message'>Sign In. </p>
                        <div className='margin-top-1'>
                            <TextField
                                variant='outlined'
                                id='email'
                                label='Email'
                                className='w-100'
                            />
                        </div>
                        <div className='margin-top-1'>
                            <TextField
                                variant='outlined'
                                id='password'
                                label='Password'
                                className='w-100'
                            />
                        </div>
                        <button className='submit'>Log In</button>
                        <p className="signin">Create an acount ?
                            <a style={{ cursor: 'pointer' }} onClick={() => setFormtype('register')}> Sign Up</a> </p>
                    </form>
                }
            </div>
        </>
    )
}

export default Form