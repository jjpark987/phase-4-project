import React from "react";
import { useUserContext } from "../context/UserContext";
import { useWorkoutContext } from "../context/WorkoutContext";
import { useNavigate } from "react-router-dom";

function Exercise({ exercise, onUpdateWorkoutInfo }) {
    const { user } = useUserContext();
    const { showEditWorkouts, currentWorkout, setCurrentWorkout } = useWorkoutContext();

    const navigate = useNavigate();

function handleExerciseChangeEdit() {
    setCurrentWorkout({ ...currentWorkout, exercise: exercise })
    navigate('/workouts/edit')
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
  // Content to render when showEditWorkouts is true
  user && (
    <button onClick={handleExerciseChangeEdit}>
      Edit workout
    </button>
  )
) : (
  // Content to render when showEditWorkouts is false
  user && (
    <button
      id='add-workout-btn'
      onClick={() => onUpdateWorkoutInfo('exercise', exercise)}
    >
      Add to workout
    </button>
  )
)}

            </div>
        </div>
    );
}

export default Exercise;
