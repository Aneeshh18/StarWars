import React, { useState, useEffect } from "react";
import CharacterCard from "./CharacterCard";
import Loader from "./Loader";
import Error from "./Error";

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [genderFilter, setGenderFilter] = useState("all");

  const fetchCharacter = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url || "https://swapi.dev/api/people/");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log(data);
      setCharacters(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacter();
  }, []);

  useEffect(() => {
    const filtered = characters.filter(
      (character) =>
        character.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (genderFilter === "all" || character.gender === genderFilter)
    );
    setFilteredCharacters(filtered);
  }, [characters, searchQuery, genderFilter]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleGenderFilterChange = (e) => {
    setGenderFilter(e.target.value);
  };

  const handlePrevPage = () => {
    if (prevPage) {
      fetchCharacter(prevPage);
    }
  };

  const handleNextPage = () => {
    if (nextPage) {
      fetchCharacter(nextPage);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="container mx-auto px-4 flex flex-col items-center">
      <div className="m-4 w-full flex justify-between">
        <div className="w-3/4 mr-2">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search you favorite characters..."
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>
        <div className="relative w-1/4">
          <select
            value={genderFilter}
            onChange={handleGenderFilterChange}
            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-md shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="all">All Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="n/a">N/A</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.293 13.707a1 1 0 011.414 0L12 15.586V3a1 1 0 112 0v12.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredCharacters.map((character, index) => (
          <CharacterCard key={index} character={character} />
        ))}
      </div>
      <div className="mt-4 mb-2 flex justify-between w-full max-w-sm">
        {prevPage && (
          <button
            onClick={handlePrevPage}
            className="bg-black hover:bg-gray-600 text-yellow-600 hover:text-white py-2 px-4 rounded focus:outline-none"
          >
            Previous Page
          </button>
        )}
        {nextPage && (
          <button
            onClick={handleNextPage}
            className="bg-black hover:bg-gray-600 text-yellow-600 hover:text-white py-2 px-4 rounded focus:outline-none"
          >
            Next Page
          </button>
        )}
      </div>
    </div>
  );
};

export default CharacterList;
