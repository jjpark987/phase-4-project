import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { useAddWorkoutContext } from "../../context/AddWorkoutContext";
import { useEditWorkoutContext } from "../../context/EditWorkoutContext";
import Workout from "../Workout";
import LoginPrompt from "../LoginPrompt";

function UserWorkouts() {
    const navigate = useNavigate();

    const { user } = useUserContext();
    const { addWorkout, setAddWorkout } = useAddWorkoutContext();
    const { showEditWorkouts, setShowEditWorkouts } = useEditWorkoutContext();

    const [showDeleteWorkouts, setShowDeleteWorkouts] = useState(false);

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

    function handleMyExercises() {
        navigate('/my_exercises')
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
                                {user.workouts.map(workout => 
                                    (workout.day === 'sunday' && 
                                        <Workout 
                                            key={workout.id} 
                                            workout={workout} 
                                            showDeleteWorkouts={showDeleteWorkouts} 
                                        />
                                    )
                                )}
                            </td>
                            <td>
                                {user.workouts.map(workout => 
                                    (workout.day === 'monday' && 
                                        <Workout 
                                            key={workout.id} 
                                            workout={workout} 
                                            showDeleteWorkouts={showDeleteWorkouts} 
                                        />
                                    )
                                )}
                            </td>
                            <td>
                                {user.workouts.map(workout => 
                                    (workout.day === 'tuesday' && 
                                        <Workout 
                                            key={workout.id} 
                                            workout={workout} 
                                            showDeleteWorkouts={showDeleteWorkouts} 
                                        />
                                    )
                                )} 
                            </td>
                            <td>
                                {user.workouts.map(workout => 
                                    (workout.day === 'wednesday' && 
                                        <Workout 
                                            key={workout.id} 
                                            workout={workout} 
                                            showDeleteWorkouts={showDeleteWorkouts} 
                                        />
                                    )
                                )}
                            </td>
                            <td>
                                {user.workouts.map(workout => 
                                    (workout.day === 'thursday' && 
                                        <Workout 
                                            key={workout.id} 
                                            workout={workout} 
                                            showDeleteWorkouts={showDeleteWorkouts} 
                                        />
                                    )
                                )}
                            </td>
                            <td>
                                {user.workouts.map(workout => 
                                    (workout.day === 'friday' && 
                                        <Workout 
                                            key={workout.id} 
                                            workout={workout} 
                                            showDeleteWorkouts={showDeleteWorkouts} 
                                        />
                                    )
                                )}
                            </td>
                            <td>
                                {user.workouts.map(workout => 
                                    (workout.day === 'saturday' && 
                                        <Workout 
                                            key={workout.id} 
                                            workout={workout} 
                                            showDeleteWorkouts={showDeleteWorkouts} 
                                        />
                                    )
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div id='edit-delete-btns'>
                    <button id='edit-workouts-btn' onClick={handleShowEditWorkouts}>Edit workouts</button>
                    <button id='delete-workouts-btn' onClick={handleShowDeleteWorkouts}>Delete workouts</button>
                    <button id='view-exercises-btn' onClick={handleMyExercises}>My exercises</button>
                </div>
            </div>
        );
    }

    return (
        <LoginPrompt />
    );
}

export default UserWorkouts;
