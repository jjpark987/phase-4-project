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

    function handleAllExercisesClick() {
        setShowEditWorkouts(false);
        navigate('/exercises');
    }

    return (
        <nav>
            <button onClick={handleHomeClick}>SWEATSTRONG</button>
            <button onClick={handleAllExercisesClick}>All exercises</button>
            <NavLink to='/workouts'>My workouts</NavLink>
            {user ? 
                <button onClick={logoutUser}>Logout</button> 
            : 
                <button onClick={() => navigate('/login')}>Login</button>
            }
        </nav>
    );
}

export default NavBar;
