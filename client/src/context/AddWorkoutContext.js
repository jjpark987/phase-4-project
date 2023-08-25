import React, { createContext, useContext, useState } from "react";

const AddWorkoutContext = createContext();

function useAddWorkoutContext() {
    return useContext(AddWorkoutContext);
}

function AddWorkoutProvider({ children }) {
    const [addWorkout, setAddWorkout] = useState({
        exercise: {},
        day: '',
        sets: 0,
        reps: 0,
        weight: 0,
        duration: 0
    });

    const contextValue = {
        addWorkout,
        setAddWorkout
    };

    return (
        <AddWorkoutContext.Provider value={contextValue}>
            {children}
        </AddWorkoutContext.Provider>
    );
}

export { AddWorkoutContext, useAddWorkoutContext, AddWorkoutProvider };
