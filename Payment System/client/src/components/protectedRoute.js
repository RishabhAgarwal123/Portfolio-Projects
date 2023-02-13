import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import GetUser from '../pages/home/home';
import { useNavigate } from 'react-router';

function ProtectedRoute(props) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const getUser = async () => {
        try {
            await GetUser().then((data) => {
                const res = data.data;
                if (res.success) {
                    message.success(res.message);
                    setUser(res.data);
                    console.log(user, res.data);
                } else message.error(res.message);
            })
        } catch (error) {
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
        <div>{props.children}</div>
    )
}

export default ProtectedRoute