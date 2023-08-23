import React, { createContext, useContext, useState } from "react";

const AttributesContext = createContext();

function useAttributesContext() {
    return useContext(AttributesContext);
}

function AttributesProvider({ children }) {
    const [uniqueAttributes, setUniqueAttributes] = useState({
        bodyParts: [],
        targets: [],
        equipments: []
    });

    const contextValue = {
        uniqueAttributes,
        setUniqueAttributes
    };

    return (
        <AttributesContext.Provider value={contextValue}>
          {children}
        </AttributesContext.Provider>
      );
}

export { AttributesContext, useAttributesContext, AttributesProvider };
