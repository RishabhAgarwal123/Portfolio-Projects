import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './register.module.css';

function Register() {
    const navigate = useNavigate()
    const formData = {
        firstname: '',
        lastname: '',
        dob: '',
        phone: '',
        email: '',
        idType: '',
        idNumber: '',
        password: '',
        confirmPassword: ''
    }

    const [registerData, setRegisterData] = useState(formData);
    const [count, setCount] = useState(0);
    const [progressStatus, setProgressStatus] = useState([true, false, false, false]);

    const nextBtn = () => {
        setCount(count + 1);
        setProgressStatus(progressStatus.fill(true, 0, count + 2))
    }

    const prevBtn = () => {
        setCount(count - 1);
        progressStatus[count] = false
    }

    const handleInput = (event) => {
        const { name, value } = event.target;
        setRegisterData({...registerData, [name]: value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

  return (
    <div>
        <form className={styles.customForm} onSubmit={handleSubmit}>
            <h1 className='text-center'>Payment Gateway Registration</h1>
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
                    <input type='text' name='firstname' id='firstname' onChange={(e) => handleInput(e)}/>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor='lastname'>Last Name</label>
                    <input type='text' name='lastname' id='lastname' onChange={(e) => handleInput(e)}/>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor='dob'>Date of Birth</label>
                    <input type='date' name='dob' id='dob' onChange={(e) => handleInput(e)}/>
                </div>
                <div>
                    <button className={`w-50 ${styles.mlAuto} ${styles.btn}`} onClick={nextBtn}>Next</button>
                </div>
            </div>

            {/* Contact */}
            <div className={`${styles.formStep} ${count === 1 ? styles.formStepActive : ''}`}>
                <div className={styles.inputGroup}>
                    <label htmlFor='phone'>Phone</label>
                    <input type='text' name='phone' id='phone' onChange={(e) => handleInput(e)}/>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' id='email' onChange={(e) => handleInput(e)}/>
                </div>
                <div className={styles.btnGroups}>
                    <button className={styles.btn} onClick={prevBtn}>Back</button>
                    <button className={styles.btn} onClick={nextBtn}>Next</button>
                </div>
            </div>

            {/* Identification */}
            <div className={`${styles.formStep} ${count === 2 ? styles.formStepActive : ''}`}>
                <select className={styles.inputGroup} onChange={handleInput} name='idType' id='idType'>
                    <option value='AADHAAR' name='idType'>Aadhaar</option>
                    <option value='PASSPORT' name='idType'>Passport</option>
                    <option value='DRIVING LICENSE' name='idType'>Driving License</option>
                </select>
                <div className={styles.inputGroup}>
                    <label htmlFor='idNumber'>Identification Number</label>
                    <input type='text' name='idNumber' id='idNumber' onChange={(e) => handleInput(e)}/>
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
                    <input type='password' name='password' id='password' onChange={(e) => handleInput(e)}/>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input type='password' name='confirmPassword' id='confirmPassword' onChange={(e) => handleInput(e)}/>
                </div>
                <div className={styles.btnGroups}>
                    <button className={styles.btn} onClick={prevBtn}>Back</button>
                    <button className={styles.btn} onSubmit={(e) => handleSubmit(e)}>Submit</button>
                </div>
            </div>

            <h1 className='text-sm text-center underline' onClick={() => navigate('/login')}>
                Already a member, Log In
            </h1>
        </form>
    </div>
  )
}

export default Register