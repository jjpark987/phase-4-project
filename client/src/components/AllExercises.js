import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Exercise from "./Exercise";
import { useAttributesContext } from "../context/AttributesContext";

function AllExercises({ onUpdateWorkoutInfo }) {
    const { uniqueAttributes, setUniqueAttributes } = useAttributesContext();

    const [exercises, setExercises] = useState([]);
    const [search, setSearch] = useState('');
    const [bodyPart, setBodyPart] = useState('');
    const [equipment, setEquipment] = useState('');
    const [start, setStart] = useState(0);

    useEffect(() => {
        fetch('/exercises/unique_attributes')
        .then(res => res.json())
        .then(data => setUniqueAttributes({
            bodyParts: data.body_parts,
            targets: data.targets,
            equipments: data.equipments
        }))
        .catch(error => console.error(error));

        fetch('/exercises')
        .then(res => res.json())
        .then(data => setExercises(data))
        .catch(error => console.error(error));
    }, []);

    function updateSearch(e) {
        setSearch(e.target.value);
    }

    function searchExercises(exercise) {
        return exercise.name.toLowerCase().includes(search.toLowerCase());
    }

    function updateBodyPart(e) {
        setBodyPart(e.target.value);
    }

    function filterBodyPart(exercise) {
        if (bodyPart === exercise.body_part || bodyPart === '') {
            return exercise;
        }
    }

    function updateEquipment(e) {
        setEquipment(e.target.value);
    }

    function filterEquipment(exercise) {
        if (equipment === exercise.equipment || equipment === '') {
            return exercise;
        }
    }

    function nextPage() {
        setStart(start + 10);
    }

    function prevPage() {
        setStart(start - 10);
    }

    return (
        <div id='all-exercises'>
            <Link id='add-exercise' to='/exercises/add'>Add new exercise</Link>
            <form id='search-filter'>
                <input
                    placeholder='Search by name'
                    value={search}
                    onChange={updateSearch}
                />
                <div id='filter'>
                    <select
                        value={bodyPart}
                        onChange={updateBodyPart}
                    >
                        <option value=''>Filter by body part</option>
                        {uniqueAttributes.bodyParts.map((bodyPart, index) => (
                            <option key={index} value={bodyPart}>{bodyPart}</option>
                        ))}
                    </select>
                    <select
                        value={equipment}
                        onChange={updateEquipment}
                    >
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
                    .slice(start, start + 10).map(exercise => (
                        <Exercise key={exercise.id} exercise={exercise} onUpdateWorkoutInfo={onUpdateWorkoutInfo} />
                ))}
            </div>
            <div id='page-navigation'>
                {start !== 0 && <button id='back-btn' onClick={prevPage}>Back</button>}
                {start <= exercises
                    .filter(exercise => searchExercises(exercise))
                    .filter(exercise => filterBodyPart(exercise))
                    .filter(exercise => filterEquipment(exercise))
                    .length - 10 && <button id='next-btn' onClick={nextPage}>Next</button>}
            </div>
        </div>
    );
}

export default AllExercises;
