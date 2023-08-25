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
    const [showDeleteWorkouts, setShowDeleteWorkouts] = useState(false);

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

    function handleAddToWorkout(day) {
        setShowEditWorkouts(false);
        setAddWorkout({ ...addWorkout, day: day });
        navigate('/workouts/add');
    }

    function handleShowEditWorkouts() {
        setShowDeleteWorkouts(false);
        setShowEditWorkouts(!showEditWorkouts);
    }

    function handleShowDeleteWorkouts() {
        setShowEditWorkouts(false);
        setShowDeleteWorkouts(!showDeleteWorkouts);
    }

    if (user) {
        return (
            <div id='my-workout'>
                <h1>{user.first_name}'s workout routine</h1>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <button className='x-large-btn' onClick={() => handleAddToWorkout('sunday')}>
                                    Sunday
                                </button>
                            </th>
                            <th>
                                <button className='x-large-btn' onClick={() => handleAddToWorkout('monday')}>
                                    Monday
                                </button>
                            </th>
                            <th>
                                <button className='x-large-btn' onClick={() => handleAddToWorkout('tuesday')}>
                                    Tuesday
                                </button>
                            </th>
                            <th>
                                <button className='x-large-btn' onClick={() => handleAddToWorkout('wednesday')}>
                                    Wednesday
                                </button>
                            </th>
                            <th>
                                <button className='x-large-btn' onClick={() => handleAddToWorkout('thursday')}>
                                    Thursday
                                </button>
                            </th>
                            <th>
                                <button className='x-large-btn' onClick={() => handleAddToWorkout('friday')}>
                                    Friday
                                </button>
                            </th>
                            <th>
                                <button className='x-large-btn' onClick={() => handleAddToWorkout('saturday')}>
                                    Saturday
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {workouts.sunday.map(workout => <Workout key={workout.id} workout={workout} showDeleteWorkouts={showDeleteWorkouts} />)}
                            </td>
                            <td>
                                {workouts.monday.map(workout => <Workout key={workout.id} workout={workout} showDeleteWorkouts={showDeleteWorkouts} />)}
                            </td>
                            <td>
                                {workouts.tuesday.map(workout => <Workout key={workout.id} workout={workout} showDeleteWorkouts={showDeleteWorkouts} />)}
                            </td>
                            <td>
                                {workouts.wednesday.map(workout => <Workout key={workout.id} workout={workout} showDeleteWorkouts={showDeleteWorkouts} />)}
                            </td>
                            <td>
                                {workouts.thursday.map(workout => <Workout key={workout.id} workout={workout} showDeleteWorkouts={showDeleteWorkouts} />)}
                            </td>
                            <td>
                                {workouts.friday.map(workout => <Workout key={workout.id} workout={workout} showDeleteWorkouts={showDeleteWorkouts} />)}
                            </td>
                            <td>
                                {workouts.saturday.map(workout => <Workout key={workout.id} workout={workout} showDeleteWorkouts={showDeleteWorkouts} />)}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div id='edit-delete-btns'>
                    <button id='edit-workouts' onClick={handleShowEditWorkouts}>Edit workouts</button>
                    <button id='delete-workouts' onClick={handleShowDeleteWorkouts}>Delete workouts</button>
                </div>
            </div>
        );
    }

    return (
        <div id='please-login'>
            <h1>Please login to see your weekly routine</h1>
            <img 
                src='https://health.clevelandclinic.org/wp-content/uploads/sites/3/2022/04/exerciseHowOften-944015592-770x533-1-650x428.jpg' 
                alt='please-login'
                style={{ width: '50vw' }}
            />
        </div>
    );
}

export default MyWorkouts;
