import React, { useState } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RegisterUser } from '../../apis/users';
import styles from './register.module.css';
import { useDispatch } from 'react-redux';
import { HideLoader, ShowLoader } from '../../redux/loaderSlice';

function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const formData = {
        firstName: '',
        lastName: '',
        dob: '',
        phone: '',
        email: '',
        idType: 'AADHAAR',
        idNumber: '',
        password: '',
        confirmPassword: ''
    }

    const [registerData, setRegisterData] = useState(formData);
    const [count, setCount] = useState(0);
    const [progressStatus, setProgressStatus] = useState([true, false, false, false]);

    const nextBtn = (event) => {
        event.preventDefault()
        setCount(count + 1);
        setProgressStatus(progressStatus.fill(true, 0, count + 2))
    }

    const prevBtn = (event) => {
        event.preventDefault();
        setCount(count - 1);
        progressStatus[count] = false
    }

    const handleInput = (event) => {
        const { name, value } = event.target;
        setRegisterData({ ...registerData, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            dispatch(ShowLoader());
            await RegisterUser(registerData).then((data) => {
                const res = data.data
                dispatch(HideLoader());
                if (res.success) {
                    message.success(res.message);
                    navigate('/login');
                } else message.error(res.message);
            });
        } catch (error) {
            dispatch(HideLoader());
            message.error(error.message);
        }
    }

    return (
        <div className='center'>
            <form className={styles.customForm}>
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
                        <input type='text' name='firstName' id='firstname' onChange={(e) => handleInput(e)} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor='lastname'>Last Name</label>
                        <input type='text' name='lastName' id='lastname' onChange={(e) => handleInput(e)} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor='dob'>Date of Birth</label>
                        <input type='date' name='dob' id='dob' onChange={(e) => handleInput(e)} />
                    </div>
                    <div>
                        <button className={`w-50 ${styles.mlAuto} ${styles.btn}`} onClick={nextBtn}>Next</button>
                    </div>
                </div>

                {/* Contact */}
                <div className={`${styles.formStep} ${count === 1 ? styles.formStepActive : ''}`}>
                    <div className={styles.inputGroup}>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' id='email' onChange={(e) => handleInput(e)} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor='phone'>Phone</label>
                        <input type='text' name='phone' id='phone' onChange={(e) => handleInput(e)} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor='address'>Address</label>
                        <input type='text' name='address' id='address' onChange={(e) => handleInput(e)} />
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
                        <input type='text' name='idNumber' id='idNumber' onChange={(e) => handleInput(e)} />
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
                        <input type='password' name='password' id='password' onChange={(e) => handleInput(e)} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <input type='password' name='confirmPassword' id='confirmPassword' onChange={(e) => handleInput(e)} />
                    </div>
                    <div className={styles.btnGroups}>
                        <button className={styles.btn} onClick={prevBtn}>Back</button>
                        <button className={styles.btn} onClick={(e) => handleSubmit(e)}>Submit</button>
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