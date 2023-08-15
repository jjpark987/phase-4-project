import React from "react";

function Exercise({ exercise }) {
    function capitalize(string) {
        return string[0].toUpperCase() + string.slice(1).toLowerCase();
    }

    return (
        <div>
            <h2>{capitalize(exercise.name)}</h2>
            <div id='exercise-info'>
                <img src={exercise.gif_url} alt={exercise.name} />
                <div id='exercise-detail'>
                    <p>{capitalize(exercise.target)}</p>
                    <p>Equipment: {capitalize(exercise.equipment)}</p>
                </div>
            </div>
        </div>
    );
}

export default Exercise;
