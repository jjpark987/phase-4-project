import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useUserContext } from "../../context/UserContext";
import { useGifsContext } from "../../context/GifsContext";
import { useNewWorkoutContext } from "../../context/NewWorkoutContext";
import { useEditWorkoutContext } from "../../context/EditWorkoutContext";

function Exercise({ exercise }) {
    const navigate = useNavigate();

    const { user } = useUserContext();
    const { gifs } = useGifsContext();
    const { newWorkout, setNewWorkout } = useNewWorkoutContext();
    const { showEditWorkouts, editWorkout, setEditWorkout } = useEditWorkoutContext();

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const areGifsLoaded = Object.values(gifs).every(gif => gif !== null && gif !== undefined);
        setLoaded(areGifsLoaded);
    }, [gifs]);

    function handleExerciseChangeEdit() {
        setEditWorkout({ ...editWorkout, exercise: exercise });
        navigate(`/workouts/${editWorkout.id}/edit`);
    }

    function handleExerciseChangeAdd() {
        setNewWorkout({ ...newWorkout, exercise: exercise });
        navigate('/workouts/new');
    }

    return (
        <div id='exercise'>
            <h3>{exercise.name}</h3>
            <div>
                {loaded && (
                    gifs[exercise.id] ? (
                        <LazyLoadImage
                            width={300}
                            height={300}
                            src={gifs[exercise.id]}
                            alt={exercise.name}
                            placeholderSrc='loading.jpg'
                        />
                    ) : (
                        <LazyLoadImage
                            width={300}
                            height={300}
                            src='no-gif-default.jpg'
                            alt={exercise.name}
                        />
                    )
                )}
            </div>
            <p>Target | <b>{exercise.target}</b></p>
            <p>Equipment | {exercise.equipment}</p>
            {showEditWorkouts ? (
                user && (<button onClick={handleExerciseChangeEdit}>Edit workout</button>)
            ) : (
                user && (<button onClick={handleExerciseChangeAdd}>Add to workout</button>)
            )}
        </div>
    );
}

export default Exercise;
