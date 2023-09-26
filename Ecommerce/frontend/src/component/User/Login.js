import React from 'react'
import styles from './UserForm.module.css';

const Login = () => {
    return (
        <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
            <form action="" className={styles.form}>
                <h1 className={`${styles.formTitle} ${styles.signUp}`}>Sign Up</h1>
                <div className={styles.formControl}>
                    <input type="text" required />
                    <label htmlFor="email">Email</label>
                </div>
                <div className={styles.formControl}>
                    <input type="password" required />
                    <label htmlFor="password">Password</label>
                </div>
                <button className={styles.btn} >Sign Up</button>
            </form>
        </div>
    )
}

export default Login