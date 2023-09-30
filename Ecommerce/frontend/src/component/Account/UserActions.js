import { SpeedDial, SpeedDialAction } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person'
import ListAltIcon from '@mui/icons-material/ListAlt'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Actions.css';

const UserActions = ({ user }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const orders = () => {
        navigate('/orders');
    }

    const account = () => {
        navigate('/account');
    }

    const dashboard = () => {
        navigate('/dashboard');
    }

    const logoutUser = () => {
        navigate('/logout');
    }

    const options = [
        { id: 2, icon: <ListAltIcon />, name: 'Orders', callback: orders },
        { id: 3, icon: <PersonIcon />, name: 'Profile', callback: account },
        { id: 4, icon: <ExitToAppIcon />, name: 'Logout', callback: logoutUser },
    ]

    if (user.user.role === 'admin') {
        options.unshift(
            { id: 1, icon: <DashboardIcon />, name: 'Dashboard', callback: dashboard }
        )
    }

    return (
        <>
            <SpeedDial
                ariaLabel='User tooltip'
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction='down'
                sx={{
                    height: '4vmax',
                  }}
                icon={
                    <img
                        className='speed-img'
                        src={
                            user.user.avatar.url ?
                                user.user.avatar.url : 'https://cdn1.iconfinder.com/data/icons/material-core/20/account-circle-1024.png'}
                    />
                }
            >
                {
                    options && options.map((option) => <SpeedDialAction
                        key={option.id}
                        icon={option.icon}
                        tooltipTitle={option.name}
                        onClick={option.callback}
                    />)
                }
            </SpeedDial>
        </>
    )
}

export default UserActions