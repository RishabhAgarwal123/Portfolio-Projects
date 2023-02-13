import { message } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginUser } from '../../apis/users';
import styles from './login.module.css';

function Login() {
    const navigate = useNavigate();
    const data = {
        email: '',
        password: ''
    }
    const [loginData, setLoginData] = useState(data)
    const handleInput = (event) => {
        const { name, value } = event.target;
        setLoginData({ ...loginData, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await LoginUser(loginData).then((data) => {
                const res = data.data;
                if (res.success) {
                    message.success(res.message);
                    localStorage.setItem('token', res.data)
                    // navigate('/');
                    window.location.href = '/'
                } else {
                    message.error(res.message);
                }
            })
        } catch (error) {
            message.error(error.message);
        }
    }
    return (
        <div className='center'>
            <form onSubmit={handleSubmit} className={styles.customForm}>
                <h1 className='text-center'>Payment Gateway Login</h1>
                <div className={`${styles.formStep} ${styles.formStepActive}`}>
                    <div className={styles.inputGroup}>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' id='email' onChange={(e) => handleInput(e)} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor='password'>Password</label>
                        <input type='password' name='password' id='password' onChange={(e) => handleInput(e)} />
                    </div>
                </div>
                <button className={`${styles.btn}`} onSubmit={(e) => handleSubmit(e)}>Login</button>

                <h1 className='text-sm text-center underline' onClick={() => navigate('/register')}>
                    Not a member, Register
                </h1>
            </form>
        </div>
    )
}

export default Login;