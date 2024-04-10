import React, { useState, useEffect, memo } from "react";
import CharacterModal from "./CharacterModal";

const CharacterCard = ({ character }) => {
  const [showModal, setShowModal] = useState(false);
  const [speciesColor, setSpeciesColor] = useState("#FFFFFF");
  const [isHovered, setIsHovered] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const fetchSpeciesColor = async () => {
      if (character.species.length > 0) {
        const speciesUrl = character.species[0];
        const response = await fetch(speciesUrl);
        const speciesData = await response.json();
        setSpeciesColor(getSpeciesColor(speciesData.name));
      }
    };

    fetchSpeciesColor();
  }, [character.species]);

  const getSpeciesColor = (species) => {
    switch (species.toLowerCase()) {
      case "human":
        return "#FFD700";
      case "droid":
        return "#C0C0C0";
      case "wookiee":
        return "#8B4513";
      default:
        return "#FFFFFF";
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const seed = Math.floor(Math.random() * 1000);
  const imageUrl = `https://picsum.photos/seed/${seed}/300/350`;

  return (
    <div className="flex justify-center">
      <div
        style={{ backgroundColor: speciesColor }}
        className={`border border-gray-400 rounded-md p-3 m-4 max-w-xs cursor-pointer transition-shadow duration-300 ${
          isHovered ? "shadow-lg" : ""
        }`}
        onClick={toggleModal}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img src={imageUrl} alt={`Pic of ${character.name}`} className="mb-2" />
        <h2 className="font-semibold text-center text-black">
          {character.name}
        </h2>
        {showModal && (
          <CharacterModal character={character} onClose={toggleModal} />
        )}
      </div>
    </div>
  );
};

export default memo(CharacterCard);
