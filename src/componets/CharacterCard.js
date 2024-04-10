import React from "react";

const CharacterCard = ({ character }) => {
  const seed = Math.floor(Math.random() * 1000);
  const imageUrl = `https://picsum.photos/seed/${seed}/300/350`;

  return (
    <div className="flex justify-center ">
      <div className="border border-gray-400 rounded-md p-3 m-4 max-w-xs cursor-pointer">
        <img src={imageUrl} alt="img" className="mb-2" />
        <h2 className="font-semibold text-center">{character.name}</h2>
      </div>
    </div>
  );
};

export default CharacterCard;
