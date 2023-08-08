import React, { useState } from "react";

function Signup({ onLoginUser }) {
    const [newAccount, setNewAccount] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    });

    function updateNewAccount(e) {
        setNewAccount({ ...newAccount, [e.target.name]: e.target.value })
    }

    function submitNewAccount(e) {
        e.preventDefault()

        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: newAccount.firstName,
                last_name: newAccount.lastName,
                email: newAccount.email,
                password: newAccount.password,
                password_confirmation: newAccount.passwordConfirmation
            })
        })
        .then(r => r.json())
        .then(d => {
            console.log(d)
            onLoginUser(d)
        })
    }

    return (
        <div>
            <h1>Create an account</h1>
            <form onSubmit={submitNewAccount}>
                <label htmlFor='signup-first-name'>First Name: </label>
                <input 
                    id='signup-first-name'
                    name='firstName'
                    value={newAccount.firstName}
                    onChange={updateNewAccount}
                    required 
                />
                <label htmlFor='signup-last-name'>Last Name: </label>
                <input 
                    id='signup-last-name'
                    name='lastName'
                    value={newAccount.lastName}
                    onChange={updateNewAccount}
                    required 
                />
                <label htmlFor='signup-email'>Email: </label>
                <input 
                    id='signup-email'
                    name='email'
                    value={newAccount.email}
                    onChange={updateNewAccount}
                    required 
                />
                <label htmlFor='signup-password'>Password: </label>
                <input 
                    id='signup-password'
                    name='password'
                    value={newAccount.password}
                    onChange={updateNewAccount}
                    required 
                />
                <label htmlFor='signup-password-confirmation'>Password confirmation: </label>
                <input 
                    id='signup-password-confirmation'
                    name='passwordConfirmation'
                    value={newAccount.passwordConfirmation}
                    onChange={updateNewAccount}
                    required 
                />
                <button>Sign up</button>
            </form>
        </div>
    );
}

export default Signup;
