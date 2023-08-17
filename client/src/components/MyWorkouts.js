import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import Workout from "./Workout";

function MyWorkouts({ onUpdateWorkoutInfo }) {
    const { user } = useUserContext();

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

    if (user) {
        return (
            <div id='my-workout'>
                <h1>{user.first_name}'s workout routine</h1>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <button className='xx-large-btn' onClick={() => onUpdateWorkoutInfo('day', 'sunday')}>Sunday</button>
                            </th>
                            <th>
                                <button className='xx-large-btn' onClick={() => onUpdateWorkoutInfo('day', 'monday')}>Monday</button>
                            </th>
                            <th>
                                <button className='xx-large-btn' onClick={() => onUpdateWorkoutInfo('day', 'tuesday')}>Tuesday</button>
                            </th>
                            <th>
                                <button className='xx-large-btn' onClick={() => onUpdateWorkoutInfo('day', 'wednesday')}>Wednesday</button>
                            </th>
                            <th>
                                <button className='xx-large-btn' onClick={() => onUpdateWorkoutInfo('day', 'thursday')}>Thursday</button>
                            </th>
                            <th>
                                <button className='xx-large-btn' onClick={() => onUpdateWorkoutInfo('day', 'friday')}>Friday</button>
                            </th>
                            <th>
                                <button className='xx-large-btn' onClick={() => onUpdateWorkoutInfo('day', 'saturday')}>Saturday</button>
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
            </div>
        );
    }

    return (
        <div>
            <h1>Please login</h1>
        </div>
    );
}

export default MyWorkouts;
