import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAttributesContext } from "../context/AttributesContext";
import Exercise from "./Exercise";

function AllExercises() {
    const { uniqueAttributes, setUniqueAttributes } = useAttributesContext();
    
    const [exercises, setExercises] = useState([]);
    const [search, setSearch] = useState('');
    const [bodyPart, setBodyPart] = useState('');
    const [equipment, setEquipment] = useState('');
    const [pageStart, setPageStart] = useState(0);
    
    useEffect(() => {
        fetch('/exercises')
        .then(res => res.json())
        .then(allExercises => setExercises(allExercises))
        .catch(error => console.error(error));

        fetch('/exercises/unique_attributes')
        .then(res => res.json())
        .then(allUniqueAttributes => setUniqueAttributes({
            bodyParts: allUniqueAttributes.body_parts,
            targets: allUniqueAttributes.targets,
            equipments: allUniqueAttributes.equipments
        }))
        .catch(error => console.error(error));
    }, []);

    function searchExercises(exercise) {
        return exercise.name.toLowerCase().includes(search.toLowerCase());
    }

    function filterBodyPart(exercise) {
        if (bodyPart === exercise.body_part || bodyPart === '') {
            return exercise;
        }
    }

    function filterEquipment(exercise) {
        if (equipment === exercise.equipment || equipment === '') {
            return exercise;
        }
    }

    return (
        <div id='all-exercises'>
            <Link id='add-exercise' to='/exercises/add'>ADD NEW EXERCISE</Link>
            <form id='search-filter'>
                <input
                    placeholder='Search by name'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <div>
                    <select value={bodyPart} onChange={e => setBodyPart(e.target.value)}>
                        <option value=''>Filter by body part</option>
                        {uniqueAttributes.bodyParts.map((bodyPart, index) => (
                            <option key={index} value={bodyPart}>{bodyPart}</option>
                        ))}
                    </select>
                    <select value={equipment} onChange={e => setEquipment(e.target.value)}>
                        <option value=''>Filter by equipment</option>
                        {uniqueAttributes.equipments.map((equipment, index) => (
                            <option key={index} value={equipment}>{equipment}</option>
                        ))}
                    </select>
                </div>
            </form>
            <div id='exercise-container'>
                {exercises
                .filter(exercise => searchExercises(exercise))
                .filter(exercise => filterBodyPart(exercise))
                .filter(exercise => filterEquipment(exercise))
                .slice(pageStart, pageStart + 10).map(exercise => (
                    <Exercise key={exercise.id} exercise={exercise} />
                ))}
            </div>
            <div id='page-navigation'>
                {pageStart !== 0 && 
                    <button id='back-btn' onClick={() => setPageStart(pageStart - 10)}>Back</button>
                }
                {pageStart <= exercises
                .filter(exercise => searchExercises(exercise))
                .filter(exercise => filterBodyPart(exercise))
                .filter(exercise => filterEquipment(exercise))
                .length - 10 && 
                    <button id='next-btn' onClick={() => setPageStart(pageStart + 10)}>Next</button>
                }
            </div>
        </div>
    );
}

export default AllExercises;
