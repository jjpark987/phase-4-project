import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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

    return (
        <nav>
            <NavLink to='/'>Enter title</NavLink>
            {user ? <Link onClick={logoutUser}>Logout</Link> : <Link to='/login'>Login</Link>}
        </nav>
    );
}

export default NavBar;
