import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Exercise from "./Exercise";

function AllExercises() {
    const [exercises, setExercises] = useState([]);
    const [start, setStart] = useState(0);

    function nextPage() {
        setStart(start + 3);
    }

    function prevPage() {
        setStart(start - 3);
    }

    useEffect(() => {
        fetch('/exercises')
        .then(res => res.json())
        .then(data => setExercises(data))
        .catch(error => console.error(error));
    }, []);

    return (
        <div id='all-exercises'>
            <Link id='add-exercise' to='/exercises/add'>Add new exercise</Link>
            <div id='exercise-container'>
                {exercises.slice(start, start + 3).map(exercise => (
                    <Exercise key={exercise.id} exercise={exercise} />
                ))}
            </div>
            <div id='page_navigation'>
                {start !== 0 && <button onClick={prevPage}>Back</button>}
                {start <= exercises.length - 3 && <button onClick={nextPage}>Next</button>}
            </div>
        </div>
    );
}

export default AllExercises;
