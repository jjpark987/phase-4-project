import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useUserContext } from './context/UserContext';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Auth from './components/Auth';
import AllExercises from './components/AllExercises';
import AddExercise from './components/AddExercise';
import Workouts from './components/Workouts';
import AddWorkout from './components/AddWorkout';

function App() {
  const { login } = useUserContext();

  const navigate = useNavigate();

  const [workoutData, setWorkoutData] = useState({
    day: '',
    exercise: {}
  });

  useEffect(() => {
    fetch('/me')
    .then(res => {
      if (res.ok) {
        res.json().then(data => login(data));
      }
    })
    .catch(error => console.error(error));
  }, []);

  function updateWorkoutData(key, value) {
    setWorkoutData({ ...workoutData, [key]: value });
    navigate('/workouts/add');
  }

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
          <AllExercises onUpdateWorkoutData={updateWorkoutData}/>
        } />
        <Route path='/exercises/add' element={
          <AddExercise />
        } />
        <Route path='/workouts' element={
          <Workouts onUpdateWorkoutData={updateWorkoutData}/>
        } />
        <Route path='/workouts/add' element={
          <AddWorkout workoutData={workoutData} onUpdateWorkoutData={updateWorkoutData} />
        } />
      </Routes>
    </div>
  );
}

export default App;
