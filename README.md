# Sweaty

Design and track your weekly workout routine with customized sets, reps, and weight for over 1000 different exercises.

https://sweaty-h35i.onrender.com/exercises

## Description

SweatStrong is a web application built with a React frontend and a Rails API backend. This single-page application adheres to RESTful conventions, providing all users with access to an exercise database. Once logged in, users can create new exercises to add to the list and even create custom weekly workout splits to suit their fitness goals efficiently.

## Models
This application comprises three models: User, Exercise, and Workout. The User and Exercise models share a many-to-many association through the Workout model, which acts as the join table. The Exercise model supports create and read actions, simplifying interactions with the exercise collection. Meanwhile, the Workout model provides full CRUD (Create, Read, Update, Delete) capabilities, enabling users to easily customize their weekly routines.

## Auth
SweatStrong employs standard password hashing techniques to ensure security. User passwords are salted and hashed before storage in the database. During login, passwords are securely validated and sessions are managed using user IDs stored in session data. There is an auto log in procedure on start-up so users don't have to log back in on page reload. While all users, logged in or not, have access to the exercise database, authorization mechanisms restrict access to creating personal weekly workout splits to logged in users only.

## Details
The application implements Active Record validations within its models to ensure data integrity. Controller validations are utilized for backend operations, modifying JSON responses as necessary. Successful operations pass the relevant object to the frontend, while errors transmit error messages for user feedback. Additionally, React's useContext hook is employed for frontend state management, persisting the logged-in user object and minimizing prop drilling.

## API Documentation
This application uses ExerciseDB by Justin Mozley. Please see this [link](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb) for the official documentation.

## Support
Please contact me at jjpark987@gmail.com for any questions.
