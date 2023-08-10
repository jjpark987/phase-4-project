import React, { useEffect, useState } from "react";
import Exercise from "./Exercise";

function AllExercises() {
    const [exercises, setExercises] = useState([]);
    const [start, setStart] = useState(0);

    function nextPage() {
        setStart(start + 10);
    }

    function prevPage() {
        setStart(start - 10);
    }

    useEffect(() => {
        fetch('/exercises')
        .then(res => res.json())
        .then(data => setExercises(data))
    }, []);

    return (
        <div className='component'>
            <div>
                {exercises.slice(start, start + 5).map(exercise => (
                    <Exercise key={exercise.id} exercise={exercise} />
                ))}
            </div>
            <div id='pages'>
                {start !== 0 && <button onClick={prevPage}>Back</button>}
                {start <= exercises.length - 10 && <button onClick={nextPage}>Next</button>}
            </div>
        </div>
    );
}

export default AllExercises;
