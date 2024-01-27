import './App.css';
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useUserContext } from './context/UserContext';
import Auth from './components/Auth';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import AllExercises from './components/exercise/AllExercises';
import NewExercise from './components/exercise/NewExercise';
import UserWorkouts from './components/workout/UserWorkouts';
import NewWorkout from './components/workout/NewWorkout';
import EditWorkout from './components/workout/EditWorkout';
import PageNotFound from './components/PageNotFound';

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
                <Route path='/about' element={
                    <About />
                } />
                <Route path='/login' element={
                    <Auth />
                } />
                <Route path='/exercises' element={
                    <AllExercises />
                } />
                <Route path='/exercises/new' element={
                    <NewExercise />
                } />
                <Route path='/workouts' element={
                    <UserWorkouts />
                } />
                <Route path='/workouts/new' element={
                    <NewWorkout />
                } />
                <Route path='/workouts/:id/edit' element={
                    <EditWorkout />
                } />
                <Route path='*' element={
                    <PageNotFound />
                } />
            </Routes>
        </div>
    );
}

export default App;
