import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import SignOutButton from './SignOutButton';

const Header = () => {
    const { isLoggedIn } = useAppContext();
    return (
        <div className="bg-blue-800 py-6">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to="/">RoomRover</Link>
                </span>
                <span className="flex space-x-2">
                    {
                        isLoggedIn ? <>
                            <span className="text-white font-bold tracking-tight flex gap-4 items-center">
                                <p className="cursor-pointer"><Link to="/my-bookings">My Bookings</Link></p>
                                <p className="cursor-pointer"><Link to="/my-hotels">My Hotels</Link></p>
                            </span>
                            <SignOutButton />
                            {/* <Link to="/sign-out" className="flex items-center bg-white text-blue-600 px-3 font-bold hover:bg-gray-100">
                                Sign Out
                            </Link> */}
                        </> : <Link to="/sign-in" className="flex items-center bg-white text-blue-600 px-3 font-bold hover:bg-gray-100">
                            Sign In
                        </Link>
                    }
                </span>
            </div>
        </div>
    )
}

export default Header