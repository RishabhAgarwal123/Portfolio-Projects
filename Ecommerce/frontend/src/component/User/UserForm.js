import React, { useState } from 'react';
import Login from './Login';
import styles from './UserForm.module.css';

const UserForm = () => {
    const [checked, setChecked] = useState(true);

    return (
        <>
        <div className={styles.divCenter}>
            <div className={`${styles.userFormContainer} ${checked && styles.rightPanelActive}`}>
                <div className={styles.overlayContainer}>
                    <div className={styles.overlay}>
                        <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
                            {checked && <Login />}
                            <h1>Have you already registered ?</h1>
                            <p>You can login with your personal info</p>
                            <button className={styles.nextSideBtn} onClick={() => setChecked(true)}>
                                Sign In
                            </button>
                        </div>
                        <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
                            <h1>Hello, Friend!</h1>
                            <p>Let's create your account</p>
                            <button className={styles.nextSideBtn} onClick={() => setChecked(false)}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default UserForm