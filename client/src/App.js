import './App.css';
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useUserContext } from './context/UserContext';
import Auth from './components/Auth';
import NavBar from './components/NavBar';
import Home from './components/Home';
import AllExercises from './components/AllExercises';
import AddExercise from './components/AddExercise';
import MyWorkouts from './components/MyWorkouts';
import AddWorkout from './components/AddWorkout';
import EditWorkout from './components/EditWorkout';
import MyExercises from './components/MyExercises';

function App() {    
    const { login } = useUserContext();
    
    useEffect(() => {
        fetch('/me')
        .then(res => {
            if (res.ok) {
                res.json().then(data => login(data));
            }
        })
        .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <NavBar />
            <Routes>
                <Route path='/' element={
                    <Home />
                } />
                <Route path='/login' element={
                    <Auth />
                } />
                <Route path='/exercises' element={
                    <AllExercises />
                } />
                <Route path='/exercises/add' element={
                    <AddExercise />
                } />
                <Route path='/workouts' element={
                    <MyWorkouts />
                } />
                <Route path='/workouts/add' element={
                    <AddWorkout />
                } />
                <Route path='/workouts/edit' element={
                    <EditWorkout />
                } />
                <Route path='/my_exercises' element={
                    <MyExercises />
                } />
            </Routes>
        </div>
    );
}

export default App;
