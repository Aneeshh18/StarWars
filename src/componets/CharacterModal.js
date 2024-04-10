import React, { useState, useEffect } from 'react';

const CharacterModal = ({ character, onClose }) => {
    const [homeworld, setHomeworld] = useState(null);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();

        return `${day}-${month}-${year}`;
    }

    useEffect(() => {
        const fetchHomeworldData = async () => {
            try {
                const response = await fetch(character.homeworld);
                const data = await response.json();
                setHomeworld(data);
            } catch (error) {
                console.error('Error fetching homeworld data:', error);
            }
        }
        fetchHomeworldData();
    }, [character.homeworld]);

    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 cursor-auto" onClick={onClose}>
            <div className="bg-white p-6 rounded-lg max-w-md overflow-hidden shadow-lg" onClick={handleModalClick}>
                <div className="text-xl font-bold mb-4 text-center">{character.name}</div>
                <div className="grid grid-cols-2 gap-x-4 mb-4">
                    <div className="text-sm">Height:</div>
                    <div>{character.height} m</div>
                    <div className="text-sm">Mass:</div>
                    <div>{character.mass} kg</div>
                    <div className="text-sm">Birth Year:</div>
                    <div>{character.birth_year}</div>
                    <div className="text-sm">Number of Films:</div>
                    <div>{character.films.length}</div>
                    <div className="text-sm">Created Date:</div>
                    <div>{formatDate(character.created)}</div>
                </div>
                {homeworld && (
                    <div className="mb-4">
                        <div className="text-sm font-bold">Homeworld:</div>
                        <div className="text-sm">Planet Name: {homeworld.name}</div>
                        <div className="text-sm">Terrain: {homeworld.terrain}</div>
                        <div className="text-sm">Climate: {homeworld.climate}</div>
                        <div className="text-sm">Number of Residents: {homeworld.residents.length}</div>
                    </div>
                )}
                <button className="w-full bg-red-800 text-white py-2 rounded hover:bg-red-700 focus:outline-none" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default CharacterModal;
