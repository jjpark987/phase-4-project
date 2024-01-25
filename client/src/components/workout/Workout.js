import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { useEditWorkoutContext } from "../../context/EditWorkoutContext";

function Workout({ workout, showDeleteWorkouts }) {
    const navigate = useNavigate();
    
    const { user, setUser } = useUserContext();
    const { setShowEditWorkouts, setEditWorkout } = useEditWorkoutContext();

    function handleEditWorkout() {
        setShowEditWorkouts(true);
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
            const updatedExercises = user.exercises.filter(exerciseElement => 
                exerciseElement.id !== workout.exercise.id
            );

            setUser({
                ...user, 
                workouts: updatedWorkouts,
                exercises: updatedExercises
            });
        })
        .catch(error => console.error(error));
    }

    if (showDeleteWorkouts) {
        return (
            <div id='workout-delete-on' onClick={() => handleDeleteWorkout()}>
                <p className='workout-name'>{workout.exercise.name}</p>
                <div className='workout-info'>
                    {(workout.sets !== 0 && workout.reps !== 0) && <p>{workout.sets} x {workout.reps}</p>}
                    {workout.weight !== 0 && <p>{workout.weight} lbs</p>}
                    {workout.duration !== 0 && <p>{workout.duration} min</p>}
                </div>
            </div>
        );
    }

    return (
        <div id='workout-delete-off' onClick={() => handleEditWorkout()}>
            <p className='workout-name'>{workout.exercise.name}</p>
            <div className='workout-info'>
                {(workout.sets !== 0 && workout.reps !== 0) && <p>{workout.sets} x {workout.reps}</p>}
                {workout.weight !== 0 && <p>{workout.weight} lbs</p>}
                {workout.duration !== 0 && <p>{workout.duration} min</p>}
            </div>
        </div>
    );
}

export default Workout;
