import React from "react";

function MyExercise({ exercise }) {

    return (
        <div>
            <h2>{exercise.name}</h2>
            <div className='exercise-info'>
                <img src={exercise.gif_url} alt={exercise.name} />
                <div className='exercise-detail'>
                    <p>{exercise.target}</p>
                    <p>Equipment: {exercise.equipment}</p>
                </div>
            </div>
        </div>
    );
}

export default MyExercise;
