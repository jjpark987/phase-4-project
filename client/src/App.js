import './App.css';
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useUserContext } from './context/UserContext';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Auth from './components/Auth';
import AllExercises from './components/AllExercises';
import AddExercise from './components/AddExercise';

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
      </Routes>
    </div>
  );
}

export default App;
