import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useAddWorkoutContext } from "../context/AddWorkoutContext";
import { useEditWorkoutContext } from "../context/EditWorkoutContext";
import Workout from "./Workout";

function MyWorkouts() {
    const navigate = useNavigate();

    const { user } = useUserContext();
    const { addWorkout, setAddWorkout } = useAddWorkoutContext();
    const { showEditWorkouts, setShowEditWorkouts } = useEditWorkoutContext();

    const [workouts, setWorkouts] = useState({
        sunday: [],
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: []
    });

    useEffect(() => {
        fetch('/workouts')
        .then(res => res.json())
        .then(data => {
            const updatedWorkouts = { ...workouts };

            data.forEach(workout => {
                updatedWorkouts[workout.day].push(workout);
            });

            setWorkouts(updatedWorkouts);
        })
        .catch(error => console.error(error));
    }, []);

    function handleAddWorkoutClick(day) {
        setAddWorkout({ ...addWorkout, day: day });
        navigate('/workouts/add');
    }

    if (user) {
        return (
            <div id='my-workout'>
                <h1>{user.first_name}'s workout routine</h1>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <button 
                                    className='x-large-btn' 
                                    onClick={() => handleAddWorkoutClick('sunday')}
                                >
                                    Sunday
                                </button>
                            </th>
                            <th>
                                <button 
                                    className='x-large-btn' 
                                    onClick={() => handleAddWorkoutClick('monday')}
                                >
                                    Monday
                                </button>
                            </th>
                            <th>
                                <button 
                                    className='x-large-btn' 
                                    onClick={() => handleAddWorkoutClick('tuesday')}
                                >
                                    Tuesday
                                </button>
                            </th>
                            <th>
                                <button 
                                    className='x-large-btn' 
                                    onClick={() => handleAddWorkoutClick('wednesday')}
                                >
                                    Wednesday
                                </button>
                            </th>
                            <th>
                                <button 
                                    className='x-large-btn' 
                                    onClick={() => handleAddWorkoutClick('thursday')}
                                >
                                    Thursday
                                </button>
                            </th>
                            <th>
                                <button 
                                    className='x-large-btn' 
                                    onClick={() => handleAddWorkoutClick('friday')}
                                >
                                    Friday
                                </button>
                            </th>
                            <th>
                                <button 
                                    className='x-large-btn' 
                                    onClick={() => handleAddWorkoutClick('saturday')}
                                >
                                    Saturday
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {workouts.sunday.map(workout => <Workout key={workout.id} workout={workout} />)}
                            </td>
                            <td>
                                {workouts.monday.map(workout => <Workout key={workout.id} workout={workout} />)}
                            </td>
                            <td>
                                {workouts.tuesday.map(workout => <Workout key={workout.id} workout={workout} />)}
                            </td>
                            <td>
                                {workouts.wednesday.map(workout => <Workout key={workout.id} workout={workout} />)}
                            </td>
                            <td>
                                {workouts.thursday.map(workout => <Workout key={workout.id} workout={workout} />)}
                            </td>
                            <td>
                                {workouts.friday.map(workout => <Workout key={workout.id} workout={workout} />)}
                            </td>
                            <td>
                                {workouts.saturday.map(workout => <Workout key={workout.id} workout={workout} />)}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button value={showEditWorkouts} onClick={() => setShowEditWorkouts(!showEditWorkouts)}>Edit workouts</button>
            </div>
        );
    }

    return (
        <div className='component'>
            <h1>Please login</h1>
            <h3>Add some image?</h3>
        </div>
    );
}

export default MyWorkouts;
