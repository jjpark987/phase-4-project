# Sweaty

Design and track your weekly workout routine with customized sets, reps, and weight for over 1000 different exercises.

Please visit the deployed website [here](https://sweaty-h35i.onrender.com/). Please allow a couple minutes for the web service to start up.

## Description

SweatStrong is a single-page application built with a React frontend and a Rails backend. Users can browse through over 1300 different exercises and create their own weekly workout routine. Each workout specifies the exercise along with the sets/reps/weight or duration, based on the type of exercise.

## Models

This application comprises of three models: User, Exercise, and Workout. The User and Exercise models share a many-to-many association through the Workout model, which is the join table. The Exercise model supports create and read actions, simplifying interactions with the exercise collection. Meanwhile, the Workout model provides full CRUD (Create, Read, Update, Delete) capabilities, enabling users to easily customize their weekly routines.

## Other features

- Utilizes useContext hooks for frontend state management
- Employs schema.rb and Active Record Migrations for version control
- Uses BCrypt's authenticate method on login for authentication
- Integrates Redis and Sidekiq::Worker for cron jobs
- Implements lazy loading for faster gif loading
- Includes usage of Active Strorage for gif blobs

## API Documentation
This application uses ExerciseDB by Justin Mozley. Please see this [link](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb) for the official documentation.

## Support
Please contact me at jjpark987@gmail.com for any questions.
