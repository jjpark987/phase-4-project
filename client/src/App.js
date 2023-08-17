import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useUserContext } from './context/UserContext';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Auth from './components/Auth';
import AllExercises from './components/AllExercises';
import AddExercise from './components/AddExercise';
import MyWorkouts from './components/MyWorkouts';
import AddWorkout from './components/AddWorkout';

function App() {
  const { login } = useUserContext();

  const navigate = useNavigate();

  const [workoutInfo, setWorkoutInfo] = useState({
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

  function updateWorkoutInfo(key, value) {
    setWorkoutInfo({ ...workoutInfo, [key]: value });
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
          <AllExercises onUpdateWorkoutInfo={updateWorkoutInfo}/>
        } />
        <Route path='/exercises/add' element={
          <AddExercise />
        } />
        <Route path='/workouts' element={
          <MyWorkouts onUpdateWorkoutInfo={updateWorkoutInfo}/>
        } />
        <Route path='/workouts/add' element={
          <AddWorkout workoutInfo={workoutInfo} onUpdateWorkoutInfo={updateWorkoutInfo} />
        } />
      </Routes>
    </div>
  );
}

export default App;
