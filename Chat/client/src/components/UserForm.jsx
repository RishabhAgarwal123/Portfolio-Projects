import axios from "axios";
import { useContext, useState } from "react"
import { UserContext } from "../ context/UserContext";

const UserForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginOrRegister, setIsLoginOrregister] = useState('register');

    const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);

    const handleSubmit = async (event) => {
        const url = isLoginOrRegister === 'register' ? 'register': 'login';
        event.preventDefault();
        const { data } = await axios.post(`/${url}`, { username, password });
        setLoggedInUsername(username);
        if (data) setId(data.id);
    }

    return (
        <div className="bg-blue-50 h-screen flex items-center">
            <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter Username"
                    value={username || ''}
                    onChange={(event) => setUsername(event.target.value)}
                    className="block w-full rounded-sm p-2 mb-2 border" />
                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password || ''}
                    onChange={(event) => setPassword(event.target.value)}
                    className="block w-full rounded-sm p-2 mb-2 border" />
                <button className="bg-blue-500 text-white block w-full rounded-md p-2">
                    { isLoginOrRegister === 'register' ? 'Register' : 'Login'}
                </button>
                <div className="text-center mt-2">
                    { isLoginOrRegister === 'register' && (
                        <div className="text-center">
                            Already a member?
                            <button onClick={() => setIsLoginOrregister('login')} className="ml-1">
                                Login here
                            </button>
                        </div>
                    )}
                    { isLoginOrRegister === 'login' && (
                        <div className="text-center">
                            Dont have an account? 
                            <button onClick={() => setIsLoginOrregister('register')} className="ml-1">
                                Register
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    )
}

export default UserForm