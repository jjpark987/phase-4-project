import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAttributesContext } from "../../context/AttributesContext";
import { useGifsContext } from "../../context/GifsContext";
import Exercise from "./Exercise";
import Pagination from "./Pagination";

function AllExercises() {
    const { uniqueAttributes, setUniqueAttributes } = useAttributesContext();
    const { setGifs } = useGifsContext();

    const [exercises, setExercises] = useState([]);
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [search, setSearch] = useState('');
    const [bodyPart, setBodyPart] = useState('');
    const [equipment, setEquipment] = useState('');
    const [sortBy, setSortBy] = useState('alphabet');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    
    useEffect(() => {
        fetch('/exercises/unique_attributes')
        .then(res => {
            if (res.ok) {
                res.json().then(allUniqueAttributes => {
                    setUniqueAttributes({
                        bodyParts: allUniqueAttributes.body_parts,
                        targets: allUniqueAttributes.targets,
                        equipments: allUniqueAttributes.equipments
                    });
                });
            }
        })
        .catch(error => console.error(error));

        fetch('/exercises/gifs')
        .then(res => {
            if (res.ok) {
                res.json().then(allGifs => setGifs(allGifs));
            }
        })
        .catch(error => console.error(error));

        fetch('/exercises')
        .then(res => {
            if (res.ok) {
                res.json().then(allExercises => {
                    setExercises(allExercises);
                    setFilteredExercises(allExercises);
                });
            }
        })
        .catch(error => console.error(error));
    }, [setUniqueAttributes, setGifs, setExercises, setFilteredExercises]);

    useEffect(() => {
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
    
        function sortByLogic(a, b) {
            if (sortBy === 'alphabet') {
                return a.name.localeCompare(b.name);
            } else {
                return a.target.localeCompare(b.target);
            }
        }

        const filtered = exercises
            .filter(exercise => searchExercises(exercise))
            .filter(exercise => filterBodyPart(exercise))
            .filter(exercise => filterEquipment(exercise))
            .sort(sortByLogic);

        setFilteredExercises(filtered);
        setTotalPages(Math.ceil(filtered.length / 12));
        setCurrentPage(1);
    }, [exercises, search, bodyPart, equipment, sortBy]);

    function clearSelections() {
        setSearch('');
        setBodyPart('');
        setEquipment('');
        setSortBy('alphabet');
    }

    return (
        <div id='all-exercises'>
            <div id='all-exercises-header'>
                <form id='search-form'>
                    <input
                        placeholder='Search by name'
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
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
                    <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                        <option value='alphabet'>Sort alphabetically</option>
                        <option value='target'>Sort by target muscle</option>
                    </select>
                    <button type='button' onClick={() => clearSelections()}>Clear</button>
                </form>
                <Link id='add-exercise-link' to='/exercises/new'>Add new exercise</Link>
                {(search && filteredExercises.length === 0) && <div id='no-results-msg'>No results</div>}
            </div>
            <div id='exercise-container'>
                {filteredExercises.slice((currentPage - 1) * 12, currentPage * 12).map(exercise => (
                    <Exercise key={exercise.id} exercise={exercise} />
                ))}
            </div>
            <div id='page-navigation'>
                <Pagination 
                    nPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
}

export default AllExercises;
