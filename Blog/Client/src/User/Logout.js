import React, { useContext, useEffect } from 'react'
import { UserContext } from '../UserContext'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Logout = () => {
    const navigate = useNavigate();
    const { setAuthenticated, setUserDetail } = useContext(UserContext);

    const logout = async () => {
        try {
            const res = await axios.get('/user/logout');
            if (res.data.success) {
                toast.success(res.data.message);
                setAuthenticated(false);
                setUserDetail(null);
                navigate('/');
            }
        } catch (error) {
            toast.error('Something went wrong!');
        }
    }

    useEffect(() => {
        logout();
    }, [])
  return (
    <div></div>
  )
}

export default Logout