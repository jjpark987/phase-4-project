import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { useNewWorkoutContext } from "../../context/NewWorkoutContext";
import LoginPrompt from "../LoginPrompt";

function NewWorkout() {
    const navigate = useNavigate();

    const { user, setUser } = useUserContext();
    const { newWorkout, setNewWorkout } = useNewWorkoutContext();

    const [errors, setErrors] = useState([]);

    function replaceImage(e) {
        const num = Math.floor(Math.random() * 4) + 1;
        e.target.src = `/default_exercise_${num}.jpeg`;
    }

    function updateNewWorkout(e) {
        setNewWorkout({ ...newWorkout, [e.target.name]: e.target.value });
    }

    function submitWorkout(e) {
        e.preventDefault();

        const workoutData = {
            workout: {
                exercise_id: newWorkout.exercise.id, 
                day: newWorkout.day,
                sets: newWorkout.sets,
                reps: newWorkout.reps,
                weight: newWorkout.weight,
                duration: newWorkout.duration
            }
        };

        fetch('/workouts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(workoutData)
        })
        .then(res => {
            const responseBody = res.json();

            if (res.ok) {
                responseBody.then(updatedWorkout => {
                    const updatedWorkouts = [ ...user.workouts, updatedWorkout ];
                    const updatedExercises = [ ...user.exercises ];

                    if (!updatedExercises.find(exercise => exercise.id === updatedWorkout.exercise.id)) {
                        updatedExercises.push(updatedWorkout.exercise);
                    }

                    setUser({
                        ...user, 
                        workouts: updatedWorkouts, 
                        exercises: updatedExercises
                    });
                    setNewWorkout({
                        exercise: {},
                        day: '',
                        sets: '',
                        reps: '',
                        weight: '',
                        duration: ''
                    });
                    navigate('/workouts');
                });
            } else {
                responseBody.then(data => setErrors(data));
            }
        })
        .catch(error => console.error(error));
    }

    if (user) {
        return (
            <div className='update-workout'>
                <div className='form-box'>
                    <form className='form' onSubmit={submitWorkout}>
                        <div className='update-workout-info'>
                            <h1>New Workout</h1>
                            <label htmlFor='workout-sets'>Sets:</label>
                            <input 
                                id='workout-sets' 
                                name='sets'
                                value={newWorkout.sets}
                                onChange={updateNewWorkout}
                            />
                            <label htmlFor='workout-reps'>Reps:</label>
                            <input 
                                id='workout-reps' 
                                name='reps'
                                value={newWorkout.reps}
                                onChange={updateNewWorkout}    
                            />
                            <label htmlFor='workout-weight'>Weight (lbs):</label>
                            <input 
                                id='workout-weight' 
                                name='weight'
                                value={newWorkout.weight}
                                onChange={updateNewWorkout}
                            />
                            <label htmlFor='workout-duration'>Duration (min):</label>
                            <input 
                                id='workout-duration' 
                                name='duration'
                                value={newWorkout.duration}
                                onChange={updateNewWorkout}
                            />
                            <button className='large-btn'>Add workout</button>
                        </div>
                        <div className='update-workout-details'>
                            <select 
                                name='day' 
                                value={newWorkout.day}
                                onChange={updateNewWorkout}
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
                            <Link to='/exercises'>Select an exercise</Link>
                            <h3>{newWorkout.exercise.name}</h3>
                            <img 
                                src={newWorkout.exercise.gif_url} 
                                alt={newWorkout.exercise.name} 
                                onError={replaceImage}
                            />
                        </div>
                    </form>
                </div>
                <div className='error-msg'>
                    {errors.error && (errors.error.map((error, index) => 
                        <h3 key={index}>{error}</h3>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <LoginPrompt />
    );
}

export default NewWorkout;
