import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { useNewWorkoutContext } from "../../context/NewWorkoutContext";
import Workout from "./Workout";
import LoginPrompt from "../LoginPrompt";

function UserWorkouts() {
    const navigate = useNavigate();

    const { user } = useUserContext();
    const { newWorkout, setNewWorkout } = useNewWorkoutContext();

    const [showDeleteWorkouts, setShowDeleteWorkouts] = useState(false);

    useEffect(() => {
        setNewWorkout({
            exercise: {},
            day: '',
            sets: '',
            reps: '',
            weight: '',
            duration: ''
        });
    }, []);

    function handleAddToWorkout(day) {
        setNewWorkout({ ...newWorkout, day: day });
        navigate('/workouts/new');
    }

    function handleShowDeleteWorkouts() {
        setShowDeleteWorkouts(!showDeleteWorkouts);
    }

    if (user) {
        return (
            <div id='user-workouts'>
                <div id='week'>
                    <div className='day'>
                        <button onClick={() => handleAddToWorkout('sunday')}>Sun</button>
                        <div className='workouts-container'>
                            {user.workouts.map(workout => 
                                (workout.day === 'sunday' && 
                                    <Workout 
                                        key={workout.id} 
                                        workout={workout} 
                                        showDeleteWorkouts={showDeleteWorkouts} 
                                    />
                                )
                            )}
                        </div>
                    </div>
                    <div className='day'>
                        <button onClick={() => handleAddToWorkout('monday')}>Mon</button>
                        <div className='workouts-container'>
                            {user.workouts.map(workout => 
                                (workout.day === 'monday' && 
                                    <Workout 
                                        key={workout.id} 
                                        workout={workout} 
                                        showDeleteWorkouts={showDeleteWorkouts} 
                                    />
                                )
                            )}
                        </div>
                    </div>
                    <div className='day'>
                        <button onClick={() => handleAddToWorkout('tuesday')}>Tue</button>
                        <div className='workouts-container'>
                            {user.workouts.map(workout => 
                                (workout.day === 'tuesday' && 
                                    <Workout 
                                        key={workout.id} 
                                        workout={workout} 
                                        showDeleteWorkouts={showDeleteWorkouts} 
                                    />
                                )
                            )} 
                        </div>
                    </div>
                    <div className='day'>
                        <button onClick={() => handleAddToWorkout('wednesday')}>Wed</button>
                        <div className='workouts-container'>
                            {user.workouts.map(workout => 
                                (workout.day === 'wednesday' && 
                                    <Workout 
                                        key={workout.id} 
                                        workout={workout} 
                                        showDeleteWorkouts={showDeleteWorkouts} 
                                    />
                                )
                            )}
                        </div>
                    </div>
                    <div className='day'>
                        <button onClick={() => handleAddToWorkout('thursday')}>Thu</button>
                        <div className='workouts-container'>
                            {user.workouts.map(workout => 
                                (workout.day === 'thursday' && 
                                    <Workout 
                                        key={workout.id} 
                                        workout={workout} 
                                        showDeleteWorkouts={showDeleteWorkouts} 
                                    />
                                )
                            )}
                        </div>
                    </div>
                    <div className='day'>
                        <button onClick={() => handleAddToWorkout('friday')}>Fri</button>
                        <div className='workouts-container'>
                            {user.workouts.map(workout => 
                                (workout.day === 'friday' && 
                                    <Workout 
                                        key={workout.id} 
                                        workout={workout} 
                                        showDeleteWorkouts={showDeleteWorkouts} 
                                    />
                                )
                            )}
                        </div>
                    </div>
                    <div className='day'>
                        <button onClick={() => handleAddToWorkout('saturday')}>Sat</button>
                        <div className='workouts-container'>
                            {user.workouts.map(workout => 
                                (workout.day === 'saturday' && 
                                    <Workout 
                                        key={workout.id} 
                                        workout={workout} 
                                        showDeleteWorkouts={showDeleteWorkouts} 
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
                {showDeleteWorkouts 
                    ? <button id='edit-workout-btn' onClick={handleShowDeleteWorkouts}>Edit workouts</button> 
                    : <button id='delete-workout-btn' onClick={handleShowDeleteWorkouts}>Delete workouts</button>}
            </div>
        );
    }

    return (
        <LoginPrompt />
    );
}

export default UserWorkouts;
