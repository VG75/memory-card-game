import React from "react";

function Card({ pokemon, onClick, isClicked }) {
  // Placeholder data for now
  const placeholderPokemon = {
    id: pokemon?.id || 1,
    name: pokemon?.name || "Pokemon",
    image: pokemon?.image || "https://via.placeholder.com/120",
    type: pokemon?.type || "normal",
  };

  return (
    <div
      className={`card ${isClicked ? "clicked" : ""}`}
      onClick={() => onClick(placeholderPokemon.id)}
    >
      <img src={placeholderPokemon.image} alt={placeholderPokemon.name} />
      <h3>{placeholderPokemon.name}</h3>
      <p>Type: {placeholderPokemon.type}</p>
    </div>
  );
}

export default Card;
