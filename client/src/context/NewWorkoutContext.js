import React, { createContext, useContext, useState } from "react";

const NewWorkoutContext = createContext();

function useNewWorkoutContext() {
    return useContext(NewWorkoutContext);
}

function NewWorkoutProvider({ children }) {
    const [newWorkout, setNewWorkout] = useState({
        exercise: {},
        day: '',
        sets: '',
        reps: '',
        weight: '',
        duration: ''
    });

    const contextValue = {
        newWorkout,
        setNewWorkout
    };

    return (
        <NewWorkoutContext.Provider value={contextValue}>
            {children}
        </NewWorkoutContext.Provider>
    );
}

export { NewWorkoutContext, useNewWorkoutContext, NewWorkoutProvider };
