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
            <button onClick={handleAllExercisesClick}>EXERCISES</button>
            <NavLink to='/workouts'>WORKOUTS</NavLink>
            {user ? 
                <button onClick={logoutUser}>LOGOUT</button> 
            : 
                <button onClick={() => navigate('/login')}>LOGIN</button>
            }
        </nav>
    );
}

export default NavBar;
