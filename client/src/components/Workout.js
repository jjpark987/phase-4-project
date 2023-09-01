import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useEditWorkoutContext } from "../context/EditWorkoutContext";

function Workout({ workout, showDeleteWorkouts }) {
    const navigate = useNavigate();
    
    const { user, setUser } = useUserContext();
    const { showEditWorkouts, setEditWorkout } = useEditWorkoutContext();

    function handleEditWorkout() {
        setEditWorkout(workout);
        navigate('/workouts/edit');
    }

    function handleDeleteWorkout() {
        fetch(`/workouts/${workout.id}`, {
            method: 'DELETE'
        })
        .then(() => {
            const updatedWorkouts = user.workouts.filter(workoutElement => 
                workoutElement.id !== workout.id    
            );

            setUser({ ...user, workouts: updatedWorkouts });
        })
        .catch(error => console.error(error));
    }

    return (
        <div id='workout-container'>
            {showEditWorkouts ? 
                <button id='workout-name-edit' onClick={handleEditWorkout}>{workout.exercise.name}</button> 
            :
                showDeleteWorkouts ? 
                    <button id='workout-name-delete' onClick={handleDeleteWorkout}>{workout.exercise.name}</button> 
                :
                    <p id='workout-name'>{workout.exercise.name}</p>
            }
            <div id='workout-info'>
                {(workout.sets !== 0 && workout.reps !== 0) && <p>{workout.sets} x {workout.reps}</p>}
                {workout.weight !== 0 && <p>{workout.weight} lbs</p>}
                {workout.duration !== 0 && <p>{workout.duration} min</p>}
            </div>
        </div>
    );
}

export default Workout;
