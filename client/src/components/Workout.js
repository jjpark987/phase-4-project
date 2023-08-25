import React from "react";
import { useNavigate } from "react-router-dom";
import { useEditWorkoutContext } from "../context/EditWorkoutContext";

function Workout({ workout }) {
    const navigate = useNavigate();
    
    const { showEditWorkouts, setEditWorkout } = useEditWorkoutContext();

    function handleEditWorkoutClick() {
        setEditWorkout(workout);
        navigate('/workouts/edit');
    }

    return (
        <div id='workout-container'>
            {showEditWorkouts ? 
                <button id='workout-name-edit' onClick={handleEditWorkoutClick}>{workout.exercise.name}</button> 
            : 
                <p id='workout-name'>{workout.exercise.name}</p>
            }
            <div id='workout-info'>
                {(workout.sets !== 0 && workout.reps !== 0) && <p>{workout.sets} x {workout.reps}</p>}
                {workout.weight !== 0 && <p>{workout.weight} lbs</p>}
                {workout.duration !== 0 && <p>{workout.duration} sec</p>}
            </div>
        </div>
    );
}

export default Workout;
