import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { AttributesProvider } from './context/AttributesContext';
import { WorkoutProvider } from './context/WorkoutContext';

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <AttributesProvider>
        <WorkoutProvider>
          <App />
        </WorkoutProvider>
      </AttributesProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
