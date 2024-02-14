import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { useGifsContext } from "../../context/GifsContext";
import { useNewWorkoutContext } from "../../context/NewWorkoutContext";
import { useEditWorkoutContext } from "../../context/EditWorkoutContext";

function Exercise({ exercise }) {
    const navigate = useNavigate();

    const { user } = useUserContext();
    const { gifs } = useGifsContext();
    const { newWorkout, setNewWorkout } = useNewWorkoutContext();
    const { showEditWorkouts, editWorkout, setEditWorkout } = useEditWorkoutContext();

    function handleExerciseChangeEdit() {
        setEditWorkout({ ...editWorkout, exercise: exercise });
        navigate(`/workouts/${editWorkout.id}/edit`);
    }

    function handleExerciseChangeAdd() {
        setNewWorkout({ ...newWorkout, exercise: exercise });
        navigate('/workouts/new');
    }

    return (
        <div id='exercise'>
            <h3>{exercise.name}</h3>
            <img 
                src={gifs[exercise.id] || '/no-gif-default.jpg'} 
                alt={exercise.name}
            />
            <p>Target | <b>{exercise.target}</b></p>
            <p>Equipment | {exercise.equipment}</p>
            {showEditWorkouts ? (
                user && (<button onClick={handleExerciseChangeEdit}>Edit workout</button>)
            ) : (
                user && (<button onClick={handleExerciseChangeAdd}>Add to workout</button>)
            )}
        </div>
    );
}

export default Exercise;
