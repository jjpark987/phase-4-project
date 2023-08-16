import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

function NavBar() {
    const { user, logout } = useUserContext();

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

    return (
        <nav>
            <NavLink to='/'>Enter title</NavLink>
            <NavLink to='/exercises'>All exercises</NavLink>
            <NavLink to='/workouts'>My workouts</NavLink>
            {user ? 
                <button onClick={logoutUser}>Logout</button> : 
                <button onClick={loginUser}>Login</button>
            }
        </nav>
    );
}

export default NavBar;
