import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAttributesContext } from "../context/AttributesContext";
import { useUserContext } from "../context/UserContext";

function AddExercise() {
    const navigate = useNavigate();
    
    const { user } = useUserContext();
    const { uniqueAttributes, setUniqueAttributes } = useAttributesContext();
    
    const [addExercise, setAddExercise] = useState({
        name: '',
        bodyPart: '',
        target: '',
        equipment: '',
        gifUrl: ''
    });
    const [errors, setErrors] = useState([]);
    
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
        })
        .catch(error => console.error(error));
    }

    if (user) {
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

    return (
        <div id='please-login'>
            <h1>Please login to add a new exercise</h1>
            <img 
                src='https://health.clevelandclinic.org/wp-content/uploads/sites/3/2022/04/exerciseHowOften-944015592-770x533-1-650x428.jpg' 
                alt='please-login'
                style={{ width: '50vw' }}
            />
        </div>
    );
}

export default AddExercise;
