import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CharacterModal from "./CharacterModal";

describe("CharacterModal", () => {
  const character = {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    birth_year: "19BBY",
    films: ["A New Hope", "The Empire Strikes Back", "Return of the Jedi"],
    created: "2022-01-01T00:00:00.000Z",
    homeworld: "https://swapi.dev/api/planets/1/",
  };

  it("displays correct person information in modal", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          name: "Tatooine",
          terrain: "Desert",
          climate: "Arid",
          residents: ["https://swapi.dev/api/people/1/"],
        }),
    });

    const { getByText, queryByText } = render(
      <CharacterModal character={character} onClose={() => {}} />
    );

    await waitFor(() => {
      expect(getByText("Luke Skywalker")).toBeInTheDocument();
      expect(getByText("Height: 172 m")).toBeInTheDocument();
      expect(getByText("Mass: 77 kg")).toBeInTheDocument();
      expect(getByText("Birth Year: 19BBY")).toBeInTheDocument();
      expect(getByText("Number of Films: 3")).toBeInTheDocument();
      expect(getByText("Created Date: 01-01-2022")).toBeInTheDocument();

      expect(getByText("Homeworld:")).toBeInTheDocument();
      expect(getByText("Planet Name: Tatooine")).toBeInTheDocument();
      expect(getByText("Terrain: Desert")).toBeInTheDocument();
      expect(getByText("Climate: Arid")).toBeInTheDocument();
      expect(getByText("Number of Residents: 1")).toBeInTheDocument();
    });

    fireEvent.click(getByText("Close"));
    expect(queryByText("Luke Skywalker")).not.toBeInTheDocument();
  });
});
