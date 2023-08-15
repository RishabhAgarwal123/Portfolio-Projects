import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

function DefaultLayout({ children }) {
    const [closeSideBar, setCloseSideBar] = useState(false);
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();
    const userMenu = [
        {
            title: 'Home',
            icon: <i className="ri-home-7-line"></i>,
            onClick: () => navigate('/'),
            path: '/'
        },
        {
            title: 'Transactions',
            icon: <i className="ri-bank-line"></i>,
            onClick: () => navigate('/transactions'),
            path: '/transactions'
        },
        {
            title: 'Request',
            icon: <i className="ri-hand-heart-line"></i>,
            onClick: () => navigate('/requests'),
            path: '/requests'
        },
        {
            title: 'Profile',
            icon: <i className="ri-user-3-line"></i>,
            onClick: () => navigate('/profile'),
            path: '/profile'
        },
        {
            title: 'Logout',
            icon: <i className="ri-logout-box-line"></i>,
            onClick: () => {
                localStorage.removeItem('token');
                navigate('/login');
            },
            path: '/logout'
        }
    ]
    const adminMenu = [
        {
            title: 'Home',
            icon: <i className="ri-home-7-line"></i>,
            onClick: () => navigate('/'),
            path: '/'
        },
        {
            title: 'Users',
            icon: <i className="ri-user-settings-line"></i>,
            onClick: () => navigate('/users'),
            path: '/users'
        },
        {
            title: 'Transactions',
            icon: <i className="ri-bank-line"></i>,
            onClick: () => navigate('/transactions'),
            path: '/transactions'
        },
        {
            title: 'Request',
            icon: <i className="ri-hand-heart-line"></i>,
            onClick: () => navigate('/requests'),
            path: '/requests'
        },
        {
            title: 'Profile',
            icon: <i className="ri-user-3-line"></i>,
            onClick: () => navigate('/profile'),
            path: '/profile'
        },
        {
            title: 'Logout',
            icon: <i className="ri-logout-box-line"></i>,
            onClick: () => {
                localStorage.removeItem('token');
                navigate('/login');
            },
            path: '/logout'
        }
    ]
    const menuToDisplay = user?.isAdmin ? adminMenu : userMenu;
    return (
        <div className='layout'>
            <div className='sidebar'>
                <div className='menu'>
                    {
                        menuToDisplay.map((menu, index) => {
                            const isActive = window.location.pathname === menu.path
                            return <div className={`menu-item ${isActive ? 'active-menu-item' : ''}`} onClick={menu.onClick} key={index}>
                                {menu.icon}
                                {!closeSideBar && <h1 className={`${isActive ? 'active-menu-item text-sm' : 'text-sm'}`}>{menu.title}</h1>}
                            </div>
                        })
                    }
                </div>
            </div>
            <div className='body'>
                <div className='header flex justify-between items-center'>
                    <div className='text-white'>
                        {closeSideBar && <i className="ri-close-line" style={{cursor: 'pointer'}} onClick={() => setCloseSideBar(!closeSideBar)}></i>}
                        {!closeSideBar && <i className="ri-menu-2-line" style={{cursor: 'pointer'}} onClick={() => setCloseSideBar(!closeSideBar)}></i>}
                    </div>
                    <div>
                        <h1 className='text-xl text-white'>
                            PAYMENT GATEWAY
                        </h1>
                    </div>
                    <div className='text-sm text-white'>
                        {user?.lastName}, {user?.firstName}
                    </div>
                </div>
                <div className='content'>{children}</div>
            </div>
        </div>
    )
}

export default DefaultLayout;