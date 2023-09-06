import React from "react";
import { useUserContext } from "../context/UserContext";
import MyExercise from "./MyExercise";

function MyExercises() {
    const { user } = useUserContext();

    return (
        <div className='component'>
            <h1>{user && user.first_name}'s exercises</h1>
            <div>
                {user && user.exercises.map(exercise => (
                    <MyExercise key={exercise.id} exercise={exercise} />
                ))}
            </div>
        </div>
    );
}

export default MyExercises;
