import React, { useEffect } from 'react';
import { message } from 'antd';
import { GetUser } from '../apis/users';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '../redux/userSlice';
import { HideLoader, ShowLoader } from '../redux/loaderSlice';

function ProtectedRoute(props) {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getUser = async () => {
        try {
            dispatch(ShowLoader());
            await GetUser().then((data) => {
                const res = data.data;
                dispatch(HideLoader());
                if (res.success) {
                    message.success(res.message);
                    dispatch(SetUser(res.data))
                    navigate("/")
                } else message.error(res.message);
            })
        } catch (error) {
            dispatch(HideLoader());
            navigate('/login');
            message.error(error.message);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            if (!user) {
                getUser();
            }
        }
        else navigate('/login');
    }, []);

    return (
        user && <div>
            {user.email}
            {props.children}
        </div>
    )
}

export default ProtectedRoute