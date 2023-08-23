import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Exercise from "./Exercise";
import { useAttributesContext } from "../context/AttributesContext";

function AllExercises({ onUpdateWorkoutInfo }) {
    const { uniqueAttributes, setUniqueAttributes } = useAttributesContext();

    const [exercises, setExercises] = useState([]);
    const [start, setStart] = useState(0);
    const [search, setSearch] = useState('');
    const [filterBy, setFilterBy] = useState('');
    const [attributeValue, setAttributeValue] = useState('');

    function updateSearch(e) {
        setSearch(e.target.value);
    }

    function updateAttributeValue(e) {
        setAttributeValue(e.target.value);
    }

    const searchExercises = exercise => exercise.name.includes(search.toLowerCase());

    function filterExercises(exercise) {
        if (!attributeValue) {
            return exercise
        }

        switch(filterBy) {
            case 'body-part':
                if (exercise.body_part === attributeValue) {
                    return exercise
                }
                break
            case 'target':
                if (exercise.target === attributeValue) {
                    return exercise
                }
                break
            case 'equipment':
                if (exercise.equipment === attributeValue) {
                    return exercise
                }
                break
            default:
                return exercise
        }
    }

    function updateFilterBy(e) {
        setFilterBy(e.target.value);
        setAttributeValue('');
    }

    function nextPage() {
        setStart(start + 10);
    }

    function prevPage() {
        setStart(start - 10);
    }

    useEffect(() => {
        fetch('/exercises')
        .then(res => res.json())
        .then(data => setExercises(data))
        .catch(error => console.error(error));

        fetch('/exercises/unique_attributes')
        .then(res => res.json())
        .then(data => setUniqueAttributes({
            bodyParts: data.body_parts,
            targets: data.targets,
            equipments: data.equipments
        }))
        .catch(error => console.error(error));
    }, []);

    return (
        <div id='all-exercises'>
            <Link id='add-exercise' to='/exercises/add'>Add new exercise</Link>
            <form id='search-filter'>
                <input
                    id='search'
                    placeholder='Search by name'
                    value={search}
                    onChange={updateSearch}
                />
                <select
                    id='filter-by'
                    value={filterBy}
                    onChange={updateFilterBy}
                >
                    <option value=''>Filter by</option>
                    <option value='body-part'>Body part</option>
                    <option value='target'>Target muscle</option>
                    <option value='equipment'>Equipment</option>
                </select>
                {filterBy === 'body-part' && (
                    <select
                        id='attribute-value'
                        value={attributeValue}
                        onChange={updateAttributeValue}
                    >
                        <option value=''>Select a body part</option>
                        {uniqueAttributes.bodyParts.map((bodyPart, index) => (
                            <option key={index} value={bodyPart}>{bodyPart}</option>
                        ))}
                    </select>
                )}
                {filterBy === 'target' && (
                    <select
                        value={attributeValue}
                        onChange={updateAttributeValue}
                    >
                        <option value=''>Select a target muscle</option>
                        {uniqueAttributes.targets.map((target, index) => (
                            <option key={index} value={target}>{target}</option>
                        ))}
                    </select>
                )}
                {filterBy === 'equipment' && (
                    <select
                        value={attributeValue}
                        onChange={updateAttributeValue}
                    >
                        <option value=''>Select an equipment</option>
                        {uniqueAttributes.equipments.map((equipment, index) => (
                            <option key={index} value={equipment}>{equipment}</option>
                        ))}
                    </select>
                )}
            </form>
            <div id='exercise-container'>
                {exercises
                    .filter(exercise => searchExercises(exercise))
                    .filter(exercise => filterExercises(exercise))
                    .slice(start, start + 10).map(exercise => (
                        <Exercise key={exercise.id} exercise={exercise} onUpdateWorkoutInfo={onUpdateWorkoutInfo} />
                ))}
            </div>
            <div id='page-navigation'>
                {start !== 0 && <button onClick={prevPage}>Back</button>}
                {start <= exercises
                    .filter(exercise => searchExercises(exercise))
                    .filter(exercise => filterExercises(exercise))
                    .length - 10 && <button onClick={nextPage}>Next</button>}
            </div>
        </div>
    );
}

export default AllExercises;
