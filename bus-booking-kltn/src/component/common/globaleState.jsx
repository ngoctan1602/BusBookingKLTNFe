import React, { createContext, useContext, useState } from 'react';

const GlobalStateContext = createContext();

export const useGlobalState = () => useContext(GlobalStateContext);

export const GlobalStateProvider = ({ children }) => {
    const [globalState, setGlobalState] = useState({
        // Khởi tạo trạng thái toàn cục ở đây
        connect: false,
        handle: false,
        message: '',
        success: false,
    });

    return (
        <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
            {children}
        </GlobalStateContext.Provider>
    );
};
