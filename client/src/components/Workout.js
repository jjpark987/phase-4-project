import React from "react";
import EditWorkout from "./EditWorkout";
import { Link, useNavigate } from "react-router-dom";
import { useWorkoutContext } from "../context/WorkoutContext";

function Workout({ workout }) {
    const { setCurrentWorkout } = useWorkoutContext();
    const { showEditWorkouts } = useWorkoutContext();

    const navigate = useNavigate();

    function handleEditClick() {
        setCurrentWorkout(workout)
        navigate('/workouts/edit');
    }

    return (
        <div id='workout-container'>
            {showEditWorkouts ? <button onClick={handleEditClick}>{workout.exercise.name}</button> : <p id='workout-name'>{workout.exercise.name}</p>}
            <div id='workout-info'>
                {(workout.sets !== 0 && workout.reps !== 0) && <p>{workout.sets} x {workout.reps}</p>}
                {workout.weight !== 0 && <p>{workout.weight} lbs</p>}
                {workout.duration !== 0 && <p>{workout.duration} sec</p>}
            </div>
        </div>
    );
}

export default Workout;
