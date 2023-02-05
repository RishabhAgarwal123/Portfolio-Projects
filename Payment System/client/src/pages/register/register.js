import React, { useState } from 'react';
import { Form } from 'antd';
import styles from './register.module.css';

function Register() {
    const [count, setCount] = useState(0);
    const [progressStatus, setProgressStatus] = useState([true, false, false, false]);

    function nextBtn() {
        setCount(count + 1);
        setProgressStatus(progressStatus.fill(true, 0, count + 2))
    }

    function prevBtn() {
        setCount(count - 1);
        progressStatus[count] = false
    }

  return (
    <div className={styles.form}>
        <Form className={styles.customForm}>
            <h1 className='text-center'>Payment Gateway</h1>
            {/* Progress Bar */}
            <div className={styles.progressBar}>
                <div className={styles.progress} id="progress"></div>
                <div className={`${styles.progressStep} ${progressStatus[0] ? styles.progressStepActive : ''}`} data-title='Intro'></div>
                <div className={`${styles.progressStep} ${progressStatus[1] ? styles.progressStepActive : ''}`} data-title="Contact"></div>
                <div className={`${styles.progressStep} ${progressStatus[2] ? styles.progressStepActive : ''}`} data-title="ID"></div>
                <div className={`${styles.progressStep} ${progressStatus[3] ? styles.progressStepActive : ''}`} data-title="Password"></div>
            </div>

            {/* Introduction */}
            <div className={`${styles.formStep} ${count === 0 ? styles.formStepActive : ''}`}>
                <div className={styles.inputGroup}>
                    <label htmlFor='firstname'>First Name</label>
                    <input type='text' name='firstname' id='firstname'/>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor='lastname'>Last Name</label>
                    <input type='text' name='lastname' id='lastname'/>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor='dob'>Date of Birth</label>
                    <input type='date' name='dob' id='dob'/>
                </div>
                <div>
                    <button className={`w-50 ${styles.mlAuto} ${styles.btn}`} onClick={nextBtn}>Next</button>
                </div>
            </div>

            {/* Contact */}
            <div className={`${styles.formStep} ${count === 1 ? styles.formStepActive : ''}`}>
                <div className={styles.inputGroup}>
                    <label htmlFor='phone'>Phone</label>
                    <input type='text' name='phone' id='phone'/>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' id='email'/>
                </div>
                <div className={styles.btnGroups}>
                    <button className={styles.btn} onClick={prevBtn}>Back</button>
                    <button className={styles.btn} onClick={nextBtn}>Next</button>
                </div>
            </div>

            {/* Identification */}
            <div className={`${styles.formStep} ${count === 2 ? styles.formStepActive : ''}`}>
                <div className={styles.inputGroup}>
                    <label htmlFor='id'>Identification ID</label>
                    <input type='text' name='id' id='id'/>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor='idNumber'>Identification Number</label>
                    <input type='text' name='idNumber' id='idNumber'/>
                </div>
                <div className={styles.btnGroups}>
                    <button className={styles.btn} onClick={prevBtn}>Back</button>
                    <button className={styles.btn} onClick={nextBtn}>Next</button>
                </div>
            </div>

            {/* Password */}
            <div className={`${styles.formStep} ${count === 3 ? styles.formStepActive : ''}`}>
                <div className={styles.inputGroup}>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' id='password'/>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input type='password' name='confirmPassword' id='confirmPassword'/>
                </div>
                <div className={styles.btnGroups}>
                    <button className={styles.btn} onClick={prevBtn}>Back</button>
                    <button className={styles.btn} onClick={nextBtn}>Submit</button>
                </div>
            </div>
        </Form>
    </div>
  )
}

export default Register