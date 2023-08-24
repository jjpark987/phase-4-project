import React, { createContext, useContext, useState } from "react";

const WorkoutContext = createContext();

function useWorkoutContext() {
    return useContext(WorkoutContext);
}

function WorkoutProvider({ children }) {
  const [showEditWorkouts, setShowEditWorkouts] = useState(false);
    const [currentWorkout, setCurrentWorkout] = useState({
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
        currentWorkout,
        setCurrentWorkout
    };

    return (
        <WorkoutContext.Provider value={contextValue}>
          {children}
        </WorkoutContext.Provider>
      );
}

export { WorkoutContext, useWorkoutContext, WorkoutProvider };