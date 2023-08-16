import React, { useEffect, useState } from "react";
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
    const [uniqueAttributes, setUniqueAttributes] = useState({
        bodyParts: [],
        targets: [],
        equipments: []
    });
    const [showInput, setShowInput] = useState({
        bodyPart: false,
        target: false,
        equipment: false
    });

    useEffect(() => {
        fetch('/exercises/unique_attributes')
        .then(res => res.json())
        .then(data => setUniqueAttributes({
            bodyParts: data.body_parts,
            targets: data.targets,
            equipments: data.equipments
        }))
        .catch(error => console.error(error));
    }, []);

    function updateAddExercise(e) {
        const { name, value } = e.target;

        value === '' && setShowInput({ ...showInput, [name]: !showInput.name });
        setAddExercise({ ...addExercise, [name]: value });
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
        })
        .catch(error => console.error(error));
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
                <select 
                    id='exercise-body-part'
                    name='bodyPart'
                    value={addExercise.bodyPart}
                    onChange={updateAddExercise}
                >
                    <option value=''>Add new body part</option>
                    {uniqueAttributes.bodyParts.map((bodyPart, index) => (
                        <option key={index} value={bodyPart}>{bodyPart}</option>
                    ))}
                </select>
                <input
                        name='bodyPart'
                        value={addExercise.bodyPart}
                        onChange={updateAddExercise}
                        required   
                />
                <label htmlFor='exercise-target'>Target muscle:</label>
                <select 
                    id='exercise-target'
                    name='target'
                    value={addExercise.target}
                    onChange={updateAddExercise}
                >
                    <option value=''>Add new muscle group</option>
                    {uniqueAttributes.targets.map((target, index) => (
                        <option key={index} value={target}>{target}</option>
                    ))}
                </select>
                <input
                    name='target'
                    value={addExercise.target}
                    onChange={updateAddExercise}
                    required   
                />
                <label htmlFor='exercise-equipment'>Equipment:</label>
                <select 
                    id='exercise-equipment'
                    name='equipment'
                    value={addExercise.equipment}
                    onChange={updateAddExercise}
                >
                    <option value=''>Add new equipment</option>
                    {uniqueAttributes.equipments.map((equipment, index) => (
                        <option key={index} value={equipment}>{equipment}</option>
                    ))}
                </select>
                <input
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