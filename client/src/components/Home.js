import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <h1>Enter title</h1>
            <h3>Enter description</h3>
            <form>
                <label htmlFor='email'>Email: </label>
                <input id='email' />
                <label htmlFor='password'>Password: </label>
                <input id='password' />
                <button>Login</button>
            </form>
            <Link to='/signup'>Sign up</Link>
        </div>
    );
}

export default Home;
