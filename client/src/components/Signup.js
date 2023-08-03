import React from "react";

function Signup() {
    return (
        <div>
            <h1>Create an account</h1>
            <form>
                <label htmlFor='email'>Email: </label>
                <input 
                    id='email' 
                    required 
                />
                <label htmlFor='password'>Password: </label>
                <input 
                    id='password' 
                    required 
                />
                <label htmlFor='password_confirmation'>Password confirmation: </label>
                <input 
                    id='password_confirmation' 
                    required 
                />
                <button>Sign up</button>
            </form>
        </div>
    )
}

export default Signup;