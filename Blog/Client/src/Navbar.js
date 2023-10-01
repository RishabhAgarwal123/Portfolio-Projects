import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header>
            <a href='/' className='logo'>My Blog</a>
            <nav>
                <Link to='/login' className='a'><span>Login</span></Link>
                <Link to='/register' className='a'><span>Register</span></Link>
            </nav>
        </header>
    )
}

export default Navbar