import React, { createContext, useContext, useState } from "react";

const GifsContext = createContext();

function useGifsContext() {
    return useContext(GifsContext);
}

function GifsProvider({ children }) {
    const [gifs, setGifs] = useState({});

    const contextValue = {
        gifs,
        setGifs
    };

    return (
        <GifsContext.Provider value={contextValue}>
          {children}
        </GifsContext.Provider>
      );
}

export { GifsContext, useGifsContext, GifsProvider };
