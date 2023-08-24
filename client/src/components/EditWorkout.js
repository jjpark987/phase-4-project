import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useWorkoutContext } from "../context/WorkoutContext";

function EditWorkout() {
    const { currentWorkout, setCurrentWorkout, setShowEditWorkouts } = useWorkoutContext();
    console.log(currentWorkout)

    const navigate = useNavigate();

    function updateCurrentWorkout(e) {
        setCurrentWorkout({ ...currentWorkout, [e.target.name]: e.target.value })
    }

    function sumbitEditWorkout(e) {
        e.preventDefault();

        fetch(`/workouts/${currentWorkout.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    workout: { ...currentWorkout, exercise_id: currentWorkout.exercise.id}
                }
            )
        })
        .then(res => res.json())
        .then(() => {
            setShowEditWorkouts(false)
            setCurrentWorkout({
                exercise: {},
                day: '',
                sets: 0,
                reps: 0,
                weight: 0,
                duration: 0
              })
            navigate('/workouts')
        })
        .catch(error => console.error(error))
        
    }

    return (
        <div>
            <form onSubmit={sumbitEditWorkout}>
                <select 
                    name='day' 
                    value={currentWorkout.day}
                    onChange={updateCurrentWorkout}
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
                {currentWorkout.exercise && <h1>{currentWorkout.exercise.name}</h1>}
                <label htmlFor='workout-sets'>Sets:</label>
                <input 
                    id='workout-sets' 
                    name='sets'
                    value={currentWorkout.sets}
                    onChange={updateCurrentWorkout}
                />
                <label htmlFor='workout-reps'>Reps:</label>
                <input 
                    id='workout-reps' 
                    name='reps'
                    value={currentWorkout.reps}
                    onChange={updateCurrentWorkout}
                />
                <label htmlFor='workout-weight'>Weight (lbs):</label>
                <input 
                    id='workout-weight' 
                    name='weight'
                    value={currentWorkout.weight}
                    onChange={updateCurrentWorkout}
                />
                <label htmlFor='workout-duration'>Duration (sec):</label>
                <input 
                    id='workout-duration' 
                    name='duration'
                    value={currentWorkout.duration}
                    onChange={updateCurrentWorkout}
                />
                <button className='large-btn'>Edit workout</button>
                <div className='error-msg'>
                    {/* {errors.errors && (errors.errors.map(
                        (error, index) => <h3 key={index}>{error}</h3>
                    ))} */}
                </div>
            </form>
        </div>
    );
}

export default EditWorkout;
