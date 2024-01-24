import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

function Auth() {
    const navigate = useNavigate();

    const { login } = useUserContext();

    const [showLogin, setShowLogin] = useState(true);
    const [account, setAccount] = useState({
        username: '',
        password: ''
    });
    const [newAccount, setNewAccount] = useState({
        firstName: '',
        email: '',
        username: '',
        password: '',
        passwordConfirmation: ''
    });
    const [errors, setErrors] = useState([]);

    function updateAccount(e) {
        setAccount({ ...account, [e.target.name]: e.target.value });
    }

    function updateNewAccount(e) {
        setNewAccount({ ...newAccount, [e.target.name]: e.target.value });
    }

    function createSession(loginData) {
        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData)
        })
        .then(res => {
            const responseBody = res.json();

            if (res.ok) {
                responseBody.then(userData => {
                    setErrors([]);
                    login(userData);
                    navigate('/workouts');
                });
            } else {
                responseBody.then(data => setErrors(data));
            }
        })
        .catch(error => console.error(error));
    }

    function submitAccount(e) {
        e.preventDefault();

        const loginData = {
            username: account.username,
            password: account.password
        };

        createSession(loginData);
    }

    function submitNewAccount(e) {
        e.preventDefault();

        const userData = { 
            user: {
                first_name: newAccount.firstName,
                email: newAccount.email,
                username: newAccount.username,
                password: newAccount.password,
                password_confirmation: newAccount.passwordConfirmation
            }
        };

        fetch('/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
        .then(res => {
            const responseBody = res.json();

            if (res.ok) {
                responseBody.then(() => {
                    const loginData = {
                        username: newAccount.username,
                        password: newAccount.password
                    };

                    createSession(loginData);
                });
            } else {
                responseBody.then(data => setErrors(data));
            }
        })
        .catch(error => console.error(error));
    }

    function handleAuthSwitch() {
        setShowLogin(() => !showLogin);
        setErrors([]);
        setAccount({
            username: '',
            password: ''
        });
        setNewAccount({
            firstName: '',
            email: '',
            username: '',
            password: '',
            passwordConfirmation: ''
        });
    }

    if (showLogin) {
        return (
            <div id='login'>
                <div className='auth'>
                    <div className='auth-box'>
                        <h1>Log in</h1>
                        <form className='auth-form' onSubmit={submitAccount}>
                            <label htmlFor='login-username'>Username</label>
                            <input 
                                id='login-username' 
                                name='username'
                                value={account.username}
                                onChange={updateAccount}
                                required
                            />
                            <label htmlFor='login-password'>Password</label>
                            <input 
                                id='login-password' 
                                name='password'
                                type='password'
                                value={account.password}
                                onChange={updateAccount}
                                required
                            />
                            <button>Log in</button>
                        </form>
                        <div className='auth-switch-prompt'>
                            <p>Don't have an account?</p>
                            <button className='auth-switch-btn' type='button' onClick={handleAuthSwitch}>Register</button>
                        </div>
                    </div>
                    <div className='error-msg'>
                        {errors.error && (errors.error.map((error, index) => 
                            <h3 key={index}>{error}</h3>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div id='signup'>
            <div className='auth'>
                <div className='auth-box'>
                    <h1>Sign up</h1>
                    <form onSubmit={submitNewAccount}>
                        <label htmlFor='signup-first-name'>First name</label>
                        <input 
                            id='signup-first-name'
                            name='firstName'
                            value={newAccount.firstName}
                            onChange={updateNewAccount}
                            required 
                        />
                        <label htmlFor='signup-email'>Email address</label>
                        <input 
                            id='signup-email'
                            name='email'
                            value={newAccount.email}
                            onChange={updateNewAccount}
                            required 
                        />
                        <label htmlFor='signup-username'>Username</label>
                        <input 
                            id='signup-username'
                            name='username'
                            value={newAccount.username}
                            onChange={updateNewAccount}
                            required 
                        />
                        <label htmlFor='signup-password'>Password</label>
                        <input 
                            id='signup-password'
                            name='password'
                            value={newAccount.password}
                            onChange={updateNewAccount}
                            required 
                            type='password'
                        />
                        <label htmlFor='signup-password-confirmation'>Password confirmation</label>
                        <input 
                            id='signup-password-confirmation'
                            name='passwordConfirmation'
                            value={newAccount.passwordConfirmation}
                            onChange={updateNewAccount}
                            required 
                            type='password'
                        />
                        <button>Sign up</button>
                    </form>
                    <div className='auth-switch-prompt'>
                        <p>Already have an account?</p>
                        <button className='auth-switch-btn' type='button' onClick={handleAuthSwitch}>Log in</button>
                    </div>
                </div>
                <div className='error-msg'>
                    {errors.error && (errors.error.map((error, index) => 
                        <h3 key={index}>{error}</h3>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Auth;
