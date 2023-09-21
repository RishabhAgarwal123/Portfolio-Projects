import { Link, useNavigate } from 'react-router-dom';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LowPriorityOutlinedIcon from '@mui/icons-material/LowPriorityOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import axios from "axios";

const Navbar = () => {
    // const { user, setUser, setIsAuthenticated } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.get("/users/logout").then((res) => {
            if (res.data.success) {
                navigate('/login');
                // setUser(null);
                // setIsAuthenticated(false);
            }
        })
    }

    return (
        <nav className='navbar sticky'>
            <div className='actions'>
                <Link to={'/dashboard'} >
                    <p className='link'><span><DashboardOutlinedIcon /></span> <span>Dashboard</span> </p>
                </Link>
                <Link to={'/tasks'} >
                    <p className='link'><LowPriorityOutlinedIcon /> <span>Tasks</span></p>
                </Link>
            </div>
            <div className='logout'>
                    <div></div>
                <p className='link' style={{cursor: 'pointer'}} onClick={handleLogout}>
                    <LogoutOutlinedIcon /> <span>Logout</span>
                </p>
            </div>
        </nav>
    )
}

export default Navbar