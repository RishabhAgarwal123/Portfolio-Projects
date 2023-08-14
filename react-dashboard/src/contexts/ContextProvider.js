import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false
}

export const ContextProvider = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setisClicked] = useState(initialState);
    const [screenSize, setScreenSize] = useState(undefined);
    const [currentColor, setCurrentColor] = useState('#03C9D7');    
    const [currentMode, setCurrentMode] = useState('Light');
    const [themeSettings, setThemeSettings] = useState(false);

    const setMode = (value) => {
        setCurrentMode(value);
        localStorage.setItem('themeMode', value);
    }

    const setColor = (value) => {
        setCurrentColor(value);
        localStorage.setItem('colorMode', value);
        setThemeSettings(false);
    }

    const handleClick = (navbarItem) => {
        setisClicked({
            ...initialState,
            [navbarItem]: true
        });
    }

    return (
        <StateContext.Provider
            value={
                {
                    activeMenu,
                    setActiveMenu,
                    isClicked,
                    setisClicked,
                    handleClick,
                    screenSize, 
                    setScreenSize,
                    currentColor,
                    setCurrentColor,
                    currentMode,
                    setCurrentMode,
                    setColor,
                    setMode,
                    themeSettings,
                    setThemeSettings
                }
            }
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)