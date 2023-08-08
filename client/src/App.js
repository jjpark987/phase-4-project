import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useUserContext } from './context/UserContext';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Signup from './components/Signup';

function App() {
  const { user, login} = useUserContext();

  function loginUser(userData) {
    login(userData);
  }

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={
          <Home />
        } />
        <Route path='/signup' element={
          <Signup onLoginUser={loginUser}/>
        } />
      </Routes>
    </div>
  );
}

export default App;
