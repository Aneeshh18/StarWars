import React from "react";
import DarthVader from "../Assets/DarthVader.jpg";

const ErrorIndicator = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black text-white">
      <img src={DarthVader} alt="Darth Vader" className="w-56 h-58 mb-8" />
      <h2 className="text-3xl font-semibold mb-4">Error: {message}</h2>
      <p className="text-lg">I find your lack of navigation disturbing!</p>
    </div>
  );
};

export default ErrorIndicator;
