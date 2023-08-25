import React, { createContext, useContext, useState } from "react";

const EditWorkoutContext = createContext();

function useEditWorkoutContext() {
    return useContext(EditWorkoutContext);
}

function EditWorkoutProvider({ children }) {
    const [showEditWorkouts, setShowEditWorkouts] = useState(false);
    const [editWorkout, setEditWorkout] = useState({
        exercise: {},
        day: '',
        sets: 0,
        reps: 0,
        weight: 0,
        duration: 0
    });

    const contextValue = {
        showEditWorkouts,
        setShowEditWorkouts,
        editWorkout,
        setEditWorkout
    };

    return (
        <EditWorkoutContext.Provider value={contextValue}>
            {children}
        </EditWorkoutContext.Provider>
    );
}

export { EditWorkoutContext, useEditWorkoutContext, EditWorkoutProvider };
