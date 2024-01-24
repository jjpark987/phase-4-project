import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { useAttributesContext } from "../../context/AttributesContext";
import LoginPrompt from "../LoginPrompt";

function NewExercise() {
    const navigate = useNavigate();
    
    const { user } = useUserContext();
    const { uniqueAttributes, setUniqueAttributes } = useAttributesContext();
    
    const [newExercise, setNewExercise] = useState({
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
        .then(allUniqueAttributes => setUniqueAttributes({
            bodyParts: allUniqueAttributes.body_parts,
            targets: allUniqueAttributes.targets,
            equipments: allUniqueAttributes.equipments
        }))
        .catch(error => console.error(error));
    }, []);

    function updateNewExercise(e) {
        setNewExercise({ ...newExercise, [e.target.name]: e.target.value });
    }

    function submitExercise(e) {
        e.preventDefault();

        const exerciseData = {
            exercise: {
                name: newExercise.name,
                body_part: newExercise.bodyPart,
                target: newExercise.target,
                equipment: newExercise.equipment,
                gif_url: newExercise.gifUrl
            }
        };

        fetch('/exercises', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(exerciseData)
        })
        .then(res => {
            const responseBody = res.json();

            if (res.ok) {
                responseBody.then(() => navigate('/exercises'));
            } else {
                responseBody.then(data => setErrors(data))
            }
        })
        .catch(error => console.error(error));
    }

    if (user) {
        return (
            <div id='new-exercise'>
                <div id='new-exercise-box'>
                    <h1>New Exercise</h1>
                    <form onSubmit={submitExercise}>
                        <label htmlFor='exercise-name'>Name</label>
                        <input 
                            id='exercise-name'
                            name='name'
                            value={newExercise.name}
                            onChange={updateNewExercise}
                            required
                        />
                        <label htmlFor='exercise-body-part'>Body part</label>
                        <select 
                            id='exercise-body-part'
                            name='bodyPart'
                            value={newExercise.bodyPart}
                            onChange={updateNewExercise}
                        >
                            <option value=''>Add new body part</option>
                            {uniqueAttributes.bodyParts.map((bodyPart, index) => (
                                <option key={index} value={bodyPart}>{bodyPart}</option>
                            ))}
                        </select>
                        <input
                                name='bodyPart'
                                value={newExercise.bodyPart}
                                onChange={updateNewExercise}
                                required   
                        />
                        <label htmlFor='exercise-target'>Target muscle</label>
                        <select 
                            id='exercise-target'
                            name='target'
                            value={newExercise.target}
                            onChange={updateNewExercise}
                        >
                            <option value=''>Add new muscle group</option>
                            {uniqueAttributes.targets.map((target, index) => (
                                <option key={index} value={target}>{target}</option>
                            ))}
                        </select>
                        <input
                            name='target'
                            value={newExercise.target}
                            onChange={updateNewExercise}
                            required   
                        />
                        <label htmlFor='exercise-equipment'>Equipment</label>
                        <select 
                            id='exercise-equipment'
                            name='equipment'
                            value={newExercise.equipment}
                            onChange={updateNewExercise}
                        >
                            <option value=''>Add new equipment</option>
                            {uniqueAttributes.equipments.map((equipment, index) => (
                                <option key={index} value={equipment}>{equipment}</option>
                            ))}
                        </select>
                        <input
                            name='equipment'
                            value={newExercise.equipment}
                            onChange={updateNewExercise} 
                            required
                        />
                        <label htmlFor='exercise-gif-url'>Gif or image URL (optional)</label>
                        <input 
                            id='exercise-gif-url'
                            name='gifUrl'
                            value={newExercise.gifUrl}
                            onChange={updateNewExercise}
                            required    
                        />
                        <button className='large-btn'>Submit</button>
                    </form>
                </div>
                {errors.errors && (errors.errors.map(
                    (error, index) => <h3 key={index}>{error}</h3>
                ))}
            </div>
        );
    }

    return (
        <LoginPrompt />
    );
}

export default NewExercise;
