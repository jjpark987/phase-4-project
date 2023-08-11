import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Auth() {
    const { login } = useUserContext();

    const navigate = useNavigate();

    const [showLogin, setShowLogin] = useState(true);

    const [account, setAccount] = useState({
        email: '',
        password: ''
    });

    const [newAccount, setNewAccount] = useState({
        firstName: '',
        lastName: '',
        email: '',
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
            const response = res.json();

            if (res.ok) {
                response.then(data => {
                    setErrors([]);
                    login(data);
                    navigate('/');
                });
            } else {
                response.then(data => setErrors(data));
            }
        });
    }

    function submitAccount(e) {
        e.preventDefault();

        const loginData = {
            email: account.email,
            password: account.password
        };

        createSession(loginData);
    }

    function submitNewAccount(e) {
        e.preventDefault();

        const userData = { 
            user: {
                first_name: newAccount.firstName,
                last_name: newAccount.lastName,
                email: newAccount.email,
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
            const response = res.json();

            if (res.ok) {
                response.then(() => {
                    const loginData = {
                        email: newAccount.email,
                        password: newAccount.password
                    }

                    createSession(loginData);
                });
            } else {
                response.then(data => setErrors(data));
            }
        })
    }

    if (showLogin) {
        return (
            <div className='component'>
                <button className='large-btn' type='button' onClick={() => setShowLogin(!showLogin)}>Create a new account</button>
                <h1>Login</h1>
                <form className='form' onSubmit={submitAccount}>
                    <label htmlFor='login-email'>Email:</label>
                    <input 
                        id='login-email' 
                        name='email'
                        value={account.email}
                        onChange={updateAccount}
                        required
                    />
                    <label htmlFor='login-password'>Password:</label>
                    <input 
                        id='login-password' 
                        name='password'
                        value={account.password}
                        onChange={updateAccount}
                        required
                    />
                    <button className='xx-large-btn'>Login</button>
                </form>
                <h3>{errors.error}</h3>
            </div>
        );
    }

    return (
        <div className='component'>
            <button className='large-btn' type='button' onClick={() => setShowLogin(!showLogin)}>Login to your account</button>
            <h1>Sign up</h1>
            <form className='form' onSubmit={submitNewAccount}>
                <label htmlFor='signup-first-name'>First name:</label>
                <input 
                    id='signup-first-name'
                    name='firstName'
                    value={newAccount.firstName}
                    onChange={updateNewAccount}
                    required 
                />
                <label htmlFor='signup-last-name'>Last name:</label>
                <input 
                    id='signup-last-name'
                    name='lastName'
                    value={newAccount.lastName}
                    onChange={updateNewAccount}
                    required 
                />
                <label htmlFor='signup-email'>Email:</label>
                <input 
                    id='signup-email'
                    name='email'
                    value={newAccount.email}
                    onChange={updateNewAccount}
                    required 
                />
                <label htmlFor='signup-password'>Password:</label>
                <input 
                    id='signup-password'
                    name='password'
                    value={newAccount.password}
                    onChange={updateNewAccount}
                    required 
                />
                <label htmlFor='signup-password-confirmation'>Password confirmation:</label>
                <input 
                    id='signup-password-confirmation'
                    name='passwordConfirmation'
                    value={newAccount.passwordConfirmation}
                    onChange={updateNewAccount}
                    required 
                />
                <button className='xx-large-btn'>Sign up</button>
            </form>
            {errors.errors && (errors.errors.map(
                (error, index) => <h3 key={index}>{error}</h3>
            ))}
        </div>
    );
}

export default Auth;
