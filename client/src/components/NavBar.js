import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useWorkoutContext } from "../context/WorkoutContext";

function NavBar() {
    const { user, logout } = useUserContext();
    const { setShowEditWorkouts } = useWorkoutContext();

    const navigate = useNavigate();

    function logoutUser() {
        fetch('/logout', {
            method: 'DELETE',
            header: { 'Content-Type': 'application/json' }
        })
        .then(() => {
            logout();
            navigate('/');
        });
    }

    function loginUser() {
        navigate('/login');
    }

    function handleExerciseclick() {
        navigate('/exercises')
        setShowEditWorkouts(false)
    }

    function handlehomeclick() {
        navigate('/')
        setShowEditWorkouts(false)
    }

    return (
        <nav>
            <button onClick={handlehomeclick}>Enter title</button>
            <button onClick={handleExerciseclick}>All exercises</button>
            <NavLink to='/workouts'>My workouts</NavLink>
            {user ? 
                <button onClick={logoutUser}>Logout</button> : 
                <button onClick={loginUser}>Login</button>
            }
        </nav>
    );
}

export default NavBar;
