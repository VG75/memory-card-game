import React from "react";
import Card from "./Card";

function GameBoard({ pokemon, onCardClick, clickedPokemon }) {
  // Placeholder data for testing
  const placeholderPokemon = Array(12)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      name: `Pokemon ${index + 1}`,
      image: "https://via.placeholder.com/120",
      type: "normal",
    }));

  const displayPokemon = pokemon.length > 0 ? pokemon : placeholderPokemon;

  return (
    <div className="game-board">
      {displayPokemon.map((pokemon) => (
        <Card
          key={pokemon.id}
          pokemon={pokemon}
          onClick={onCardClick}
          isClicked={clickedPokemon.has(pokemon.id)}
        />
      ))}
    </div>
  );
}

export default GameBoard;
