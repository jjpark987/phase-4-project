import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

function useUserContext() {
    return useContext(UserContext);
}

function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = userData => { setUser(userData) };

    const logout = () => { setUser(null) };

    const contextValue = {
        user,
        // ADDED setUser TO UPDATE WORKOUTS ARRAY OF OBJECTS NESTED IN user IN MY FRONTEND
        setUser,
        login,
        logout,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, useUserContext, UserProvider };
