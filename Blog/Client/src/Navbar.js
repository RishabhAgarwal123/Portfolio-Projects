import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';

const styles = {
    fontWeight: 'bold'
}

const Navbar = () => {
    const { userDetail, authenticated } = useContext(UserContext);
    const { username } = userDetail;

    return (
        <header>
            <Link to={'/home'} className='logo'><span>My blog</span></Link>
            {!authenticated && <nav>
                <Link to='/login' className='a'><span>Login</span></Link>
                <Link to='/register' className='a'><span>Register</span></Link>
            </nav>}
            {authenticated && <nav>
                <Link to={'/create'} className='a'><span>Create New Post</span></Link>
                <Link to='/' className='a' style={styles}><span>{`(${username})`}</span></Link>
                <Link to='/logout' className='a'><span>Logout</span></Link>
            </nav>}
        </header>
    )
}

export default Navbar