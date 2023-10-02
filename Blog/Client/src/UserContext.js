import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import axios from 'axios';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [id, setId] = useState(null);
    const [userDetail, setUserDetail] = useState(null);

    const getProfile = async () => {
        const res = await axios.get('/user/me');
        if (res.data.success) {
            setUserDetail(res.data.user)
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    }

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <UserContext.Provider
            value={{
                authenticated, setAuthenticated,
                userDetail, setUserDetail,
                isLoading, setIsLoading,
                id, setId
            }}
        >
            { children }
        </UserContext.Provider>
    )
}