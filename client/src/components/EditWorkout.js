import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEditWorkoutContext } from "../context/EditWorkoutContext";

function EditWorkout() {
    const navigate = useNavigate();

    const { setShowEditWorkouts, editWorkout, setEditWorkout } = useEditWorkoutContext();
    
    const [errors, setErrors] = useState([]);

    function updateEditWorkout(e) {
        setEditWorkout({ ...editWorkout, [e.target.name]: e.target.value });
    }

    function sumbitEditWorkout(e) {
        e.preventDefault();

        fetch(`/workouts/${editWorkout.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                workout: { ...editWorkout, exercise_id: editWorkout.exercise.id }
            })
        })
        .then(res => {
            const response = res.json();

            if (res.ok) {
                response.then(() => {
                    setShowEditWorkouts(false);
                    setEditWorkout({
                        exercise: {},
                        day: '',
                        sets: 0,
                        reps: 0,
                        weight: 0,
                        duration: 0
                      });
                    navigate('/workouts');
                });
            } else {
                response.then(data => setErrors(data));
            }
        })
        .catch(error => console.error(error));
    }

    return (
        <div>
            <form onSubmit={sumbitEditWorkout}>
                <select 
                    name='day' 
                    value={editWorkout.day}
                    onChange={updateEditWorkout}
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
                <Link className='select-exercise' to='/exercises'>Select an exercise</Link>
                {editWorkout.exercise && <h1>{editWorkout.exercise.name}</h1>}
                <label htmlFor='workout-sets'>Sets:</label>
                <input 
                    id='workout-sets' 
                    name='sets'
                    value={editWorkout.sets}
                    onChange={updateEditWorkout}
                />
                <label htmlFor='workout-reps'>Reps:</label>
                <input 
                    id='workout-reps' 
                    name='reps'
                    value={editWorkout.reps}
                    onChange={updateEditWorkout}
                />
                <label htmlFor='workout-weight'>Weight (lbs):</label>
                <input 
                    id='workout-weight' 
                    name='weight'
                    value={editWorkout.weight}
                    onChange={updateEditWorkout}
                />
                <label htmlFor='workout-duration'>Duration (min):</label>
                <input 
                    id='workout-duration' 
                    name='duration'
                    value={editWorkout.duration}
                    onChange={updateEditWorkout}
                />
                <button className='large-btn'>Edit workout</button>
                <div className='error-msg'>
                    {errors.error && (errors.error.map(
                        (error, index) => <h3 key={index}>{error}</h3>
                    ))}
                </div>
            </form>
        </div>
    );
}

export default EditWorkout;
