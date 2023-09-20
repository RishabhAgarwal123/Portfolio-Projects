import { createContext } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({children}) => {
    return <UserContext.Provider
        value={{a: 1}}
    >
        {children}
    </UserContext.Provider>
}