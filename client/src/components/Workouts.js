import React from "react";
import { useUserContext } from "../context/UserContext";

function Workouts({ onUpdateWorkoutData }) {
    const { user } = useUserContext();

    if (user) {
        return (
            <div>
                <h1>{user.first_name}'s workout routine</h1>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <button onClick={() => onUpdateWorkoutData('day', 'sunday')}>Sunday</button>
                            </th>
                            <th>
                                <button onClick={() => onUpdateWorkoutData('day', 'monday')}>Monday</button>
                            </th>
                            <th>
                                <button onClick={() => onUpdateWorkoutData('day', 'tuesday')}>Tuesday</button>
                            </th>
                            <th>
                                <button onClick={() => onUpdateWorkoutData('day', 'wednesday')}>Wednesday</button>
                            </th>
                            <th>
                                <button onClick={() => onUpdateWorkoutData('day', 'thursday')}>Thursday</button>
                            </th>
                            <th>
                                <button onClick={() => onUpdateWorkoutData('day', 'friday')}>Friday</button>
                            </th>
                            <th>
                                <button onClick={() => onUpdateWorkoutData('day', 'saturday')}>Saturday</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
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

export default Workouts;
