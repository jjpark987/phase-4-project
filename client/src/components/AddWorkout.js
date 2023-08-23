import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddWorkout({ workoutInfo, onUpdateWorkoutInfo }) {
    const navigate = useNavigate();

    const [addWorkout, setAddWorkout] = useState({
        day: workoutInfo.day,
        exerciseId: workoutInfo.exercise.id,
        sets: 0,
        reps: 0,
        weight: 0,
        duration: 0
    });
    const [errors, setErrors] = useState([]);

    function updateAddWorkout(e) {
        const { name, value } = e.target;

        setAddWorkout({ ...addWorkout, [name]: value });
        
        if (name === 'day') {
            onUpdateWorkoutInfo('day', value);
        }
    }
    
    function submitWorkout(e) {
        e.preventDefault();

        const workoutData = {
            exercise_id: addWorkout.exerciseId,
            day: addWorkout.day,
            sets: addWorkout.sets,
            reps: addWorkout.reps,
            weight: addWorkout.weight,
            duration: addWorkout.duration
        };

        fetch('/workouts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(workoutData)
        })
        .then(res => {
            const response = res.json();

            if (res.ok) {
                response.then(() => navigate('/workouts'));
            } else {
                response.then(data => setErrors(data))
            }
        })
        .catch(error => console.error(error));
    }

    return (
        <div>
            <form onSubmit={submitWorkout}>
                <select 
                    name='day' 
                    value={addWorkout.day}
                    onChange={updateAddWorkout}
                >
                    <option value=''>Select a day</option>
                    <option value='sunday'>Sunday</option>
                    <option value='monday'>Monday</option>
                    <option value='tuesday'>Tuesday</option>
                    <option value='wednesday'>Wednesday</option>
                    <option value='thursday'>Thursday</option>
                    <option value='friday'>Friday</option>
                    <option value='saturday'>Saturday</option>
                </select>
                <Link id='select-exercise' to='/exercises'>Select an exercise</Link>
                {workoutInfo.exercise && <h1>{workoutInfo.exercise.name}</h1>}
                <label htmlFor='workout-sets'>Sets:</label>
                <input 
                    id='workout-sets' 
                    name='sets'
                    value={addWorkout.sets}
                    onChange={updateAddWorkout}
                />
                <label htmlFor='workout-reps'>Reps:</label>
                <input 
                    id='workout-reps' 
                    name='reps'
                    value={addWorkout.reps}
                    onChange={updateAddWorkout}    
                />
                <label htmlFor='workout-weight'>Weight (lbs):</label>
                <input 
                    id='workout-weight' 
                    name='weight'
                    value={addWorkout.weight}
                    onChange={updateAddWorkout}
                />
                <label htmlFor='workout-duration'>Duration (sec):</label>
                <input 
                    id='workout-duration' 
                    name='duration'
                    value={addWorkout.duration}
                    onChange={updateAddWorkout}
                />
                <button className='large-btn'>Add workout</button>
                <div className='error-msg'>
                    {errors.errors && (errors.errors.map(
                        (error, index) => <h3 key={index}>{error}</h3>
                    ))}
                </div>
            </form>
        </div>
    );
}

export default AddWorkout;
