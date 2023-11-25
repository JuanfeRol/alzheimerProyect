"use client";

import React, { createContext, useContext, useState } from 'react'

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(true);

    const setGlobalLoggedIn = (value) => {
        setLoggedIn(value);
    }
    
    return (
        <GlobalContext.Provider value={{ loggedIn, setGlobalLoggedIn }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)