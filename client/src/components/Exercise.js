import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useAddWorkoutContext } from "../context/AddWorkoutContext";
import { useEditWorkoutContext } from "../context/EditWorkoutContext";

function Exercise({ exercise }) {
    const navigate = useNavigate();

    const { user } = useUserContext();
    const { addWorkout, setAddWorkout } = useAddWorkoutContext();
    const { showEditWorkouts, editWorkout, setEditWorkout } = useEditWorkoutContext();

    function handleExerciseChangeEdit() {
        setEditWorkout({ ...editWorkout, exercise: exercise });
        navigate('/workouts/edit');
    }

    function handleExerciseChangeAdd() {
        setAddWorkout({ ...addWorkout, exercise: exercise });
        navigate('/workouts/add');
    }

    return (
        <div>
            <h2>{exercise.name}</h2>
            <div id='exercise-info'>
                <img src={exercise.gif_url} alt={exercise.name} />
                <div id='exercise-detail'>
                    <p>{exercise.target}</p>
                    <p>Equipment: {exercise.equipment}</p>
                </div>
                {showEditWorkouts ? (
                    user && (<button onClick={handleExerciseChangeEdit}>Edit workout</button>)
                ) : (
                    user && (<button onClick={handleExerciseChangeAdd}>Add to workout</button>)
                )}
            </div>
        </div>
    );
}

export default Exercise;
