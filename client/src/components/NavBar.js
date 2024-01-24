import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useEditWorkoutContext } from "../context/EditWorkoutContext";

function NavBar() {
    const navigate = useNavigate();

    const { user, logout } = useUserContext();
    const { setShowEditWorkouts } = useEditWorkoutContext();

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

    function handleHomeClick() {
        setShowEditWorkouts(false);
        navigate('/');
    }

    function handleAboutClick() {
        setShowEditWorkouts(false);
        navigate('/about');
    }

    function handleAllExercisesClick() {
        setShowEditWorkouts(false);
        navigate('/exercises');
    }

    return (
        <nav>
            <button id='navbar-title' onClick={handleHomeClick}>SWEATY</button>
            <button id='navbar-about' onClick={handleAboutClick}>About</button>
            <button id='navbar-exercises' onClick={handleAllExercisesClick}>Exercises</button>
            <NavLink id='navbar-workouts' to='/workouts'>Workouts</NavLink>
            {user ? 
                <button id='navbar-auth' onClick={logoutUser}>Log out</button> 
            : 
                <button id='navbar-auth' onClick={() => navigate('/login')}>Log in</button>
            }
        </nav>
    );
}

export default NavBar;
