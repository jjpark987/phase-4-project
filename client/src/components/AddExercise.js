import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddExercise() {
    const navigate = useNavigate();

    const [addExercise, setAddExercise] = useState({
        name: '',
        bodyPart: '',
        target: '',
        equipment: '',
        gifUrl: ''
    });
    const [errors, setErrors] = useState([]);

    function updateAddExercise(e) {
        setAddExercise({ ...addExercise, [e.target.name]: e.target.value });
    }

    function submitExercise(e) {
        e.preventDefault();

        const exerciseData = {
            exercise: {
                name: addExercise.name,
                body_part: addExercise.bodyPart,
                target: addExercise.target,
                equipment: addExercise.equipment,
                gif_url: addExercise.gifUrl
            }
        };

        fetch('/exercises', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(exerciseData)
        })
        .then(res => {
            const response = res.json();

            if (res.ok) {
                response.then(() => navigate('/exercises'));
            } else {
                response.then(data => setErrors(data))
            }
        });
    }

    return (
        <div className='component'>
            <h1>Add new exercise</h1>
            <form className='form' onSubmit={submitExercise}>
                <label htmlFor='exercise-name'>Name:</label>
                <input 
                    id='exercise-name'
                    name='name'
                    value={addExercise.name}
                    onChange={updateAddExercise}
                    required
                />
                <label htmlFor='exercise-body-part'>Body part:</label>
                <input 
                    id='exercise-body-part'
                    name='bodyPart'
                    value={addExercise.bodyPart}
                    onChange={updateAddExercise}
                    required    
                />
                <label htmlFor='exercise-target'>Target muscle:</label>
                <input 
                    id='exercise-target'
                    name='target'
                    value={addExercise.target}
                    onChange={updateAddExercise}
                    required
                />
                <label htmlFor='exercise-equipment'>Equipment:</label>
                <input 
                    id='exercise-equipment'
                    name='equipment'
                    value={addExercise.equipment}
                    onChange={updateAddExercise}
                    required    
                />
                <label htmlFor='exercise-gif-url'>Gif or image URL:</label>
                <input 
                    id='exercise-gif-url'
                    name='gifUrl'
                    value={addExercise.gifUrl}
                    onChange={updateAddExercise}
                    required    
                />
                <button className='large-btn'>Add exercise</button>
            </form>
            {errors.errors && (errors.errors.map(
                (error, index) => <h3 key={index}>{error}</h3>
            ))}
        </div>
    );
}

export default AddExercise;