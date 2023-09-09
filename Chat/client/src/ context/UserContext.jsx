/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const [username, setUsername] = useState(null);
    const [id, setId] = useState(null);

    const getProfile = () => {
        axios.get('/profile').then((response) => {
            const { data: { userId, username } } = response;
            setId(userId);
            setUsername(username);
        })
    }

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <UserContext.Provider value={{
            username, setUsername,
            id, setId
        }}>
            {children}
        </UserContext.Provider>
    )
}