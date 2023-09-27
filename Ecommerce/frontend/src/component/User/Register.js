import React from 'react'
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';

const Register = () => {
    
    return (
        <div className='body'> 
            <div className='form'>
                <h1 className="form-title sign-in">Sign Up</h1>
                <div className="form-control">
                    <span><DriveFileRenameOutlineOutlinedIcon sx={{marginRight: '5px'}} /></span>
                    <input type="text" name='name' placeholder='Name' />
                </div>
                <div className="form-control">
                    <span><AlternateEmailOutlinedIcon sx={{marginRight: '5px'}} /></span>
                    <input type="text" name='email' placeholder='Email' />
                </div>
                <div className="form-control">
                    <span><LockOutlinedIcon sx={{marginRight: '5px'}} /></span>
                    <input type="password" name='password' placeholder='Password' />
                </div>
                <div className='upload'>
                    <img alt='Avatar Preview' src='https://cdn1.iconfinder.com/data/icons/material-core/20/account-circle-1024.png' />
                    <label className="custom-file-input">
                        <input type="file" name="avatar" accept="image/*" />
                        <span className="custom-file-label">Choose a file</span>
                    </label>
                </div>
                <button onClick={() => false}>Sign Up</button>
            </div>
        </div>
    )
}

export default Register