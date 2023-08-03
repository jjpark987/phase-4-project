import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Signup from './components/Signup';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={
          <Home />
        } />
        <Route path='/signup' element={
          <Signup />
        } />
      </Routes>
    </div>
  );
}

export default App;
