import React from "react";
import { useUserContext } from "../context/UserContext";

function Exercise({ exercise, onUpdateWorkoutData }) {
    const { user } = useUserContext();

    return (
        <div>
            <h2>{exercise.name}</h2>
            <div id='exercise-info'>
                <img src={exercise.gif_url} alt={exercise.name} />
                <div id='exercise-detail'>
                    <p>{exercise.target}</p>
                    <p>Equipment: {exercise.equipment}</p>
                </div>
            </div>
            {user && <button onClick={() => onUpdateWorkoutData('exercise', exercise)}>Add to workout</button>}
        </div>
    );
}

export default Exercise;
