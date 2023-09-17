import { Link } from 'react-router-dom';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LowPriorityOutlinedIcon from '@mui/icons-material/LowPriorityOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const Navbar = () => {
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
                    <Link to={'/logout'} >
                        <p className='link'>
                            <LogoutOutlinedIcon /> <span>Logout</span>
                        </p>
                    </Link>
                </div>
            </nav>
  )
}

export default Navbar