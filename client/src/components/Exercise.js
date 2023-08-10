import React from "react";

function Exercise({ exercise }) {
    function capitalize(string) {
        return string[0].toUpperCase() + string.slice(1).toLowerCase();
    }

    return (
        <div>
            <h1>{capitalize(exercise.name)}</h1>
            <div id='exercise-info'>
                <img src={exercise.gif_url} alt={exercise.gif_url} />
                <div id='exercise-detail'>
                    <p>{capitalize(exercise.target)}</p>
                    <p>Equipment: {capitalize(exercise.equipment)}</p>
                    <p>{exercise.equipment === 'assisted' && 'Assitance needed'}</p>
                </div>
            </div>
        </div>
    );
}

export default Exercise;
