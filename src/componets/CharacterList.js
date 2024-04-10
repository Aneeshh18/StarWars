import React, { useState, useEffect } from "react";
import CharacterCard from "./CharacterCard";
import Loader from "./Loader";
import Error from "./Error";

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://swapi.dev/api/people/");
        if (!response) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data);
        setCharacters(data.results);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchCharacter();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="m-2">
      <div className="grid grid-cols-3 gap-3">
        {characters.map((character, index) => (
          <CharacterCard key={index} character={character} />
        ))}
      </div>
    </div>
  );
};

export default CharacterList;
