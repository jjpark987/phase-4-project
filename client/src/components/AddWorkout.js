import React, { useState } from "react";
import { Link } from "react-router-dom";

function AddWorkout({ workoutData, onUpdateWorkoutData }) {
    const [addWorkout, setAddWorkout] = useState({
        day: workoutData.day,
        exerciseId: workoutData.exercise.id,
        sets: 0,
        reps: 0,
        weight: 0,
        duration: 0
    });

    function updateAddWorkout(e) {
        const { name, value } = e.target

        setAddWorkout({ ...addWorkout, [name]: value });
        
        if (name === 'day') {
            onUpdateWorkoutData('day', value);
        }
    }

    return (
        <div>
            <form>
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
                <Link to='/exercises'>Choose an exercise</Link>
                {workoutData.exercise && <p>{workoutData.exercise.name}</p>}
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
                <label htmlFor='workout-sets'>Weight:</label>
                <input 
                    id='workout-weight' 
                    name='weight'
                    value={addWorkout.weight}
                    onChange={updateAddWorkout}
                />
                <label htmlFor='workout-sets'>Duration:</label>
                <input 
                    id='workout-duration' 
                    name='duration'
                    value={addWorkout.duration}
                    onChange={updateAddWorkout}
                />
                <button>Add workout</button>
            </form>
        </div>
    );
}

export default AddWorkout;
