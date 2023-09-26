import React, { useState } from 'react';
import Login from './Login';
import styles from './UserForm.module.css';
import Register from './Register';
import './form.css';

const UserForm = () => {
    const [checked, setChecked] = useState(true);
    console.log(checked)
    return (
        <>
            <div className="body">
                <div className={`container ${checked ? 'right-panel-active' : ''}`} id="container">
                    <div className={`form-container sign-up-container ${checked ? 'right-panel-active' : ''}`}>
                        <Register />
                    </div>
                    <div className={`form-container sign-in-container ${checked ? 'right-panel-active' : ''}`}>
                        <Login />
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Have you already registered ?</h1>
                                <p>You can login with your personal info</p>
                                <button className="next-side-btn" id="sign-in" onClick={() => setChecked(true)}>
                                    Sign In
                                </button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>Let's create your account</p>
                                <button className="next-side-btn" id="sign-up" onClick={() => setChecked(false)}>
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            );


        </>
    )
}

export default UserForm