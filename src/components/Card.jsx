import React from "react";

function Card({ pokemon, onClick, isClicked }) {
  const displayPokemon = {
    id: pokemon?.id || 1,
    name: pokemon?.name || "Pokemon",
    image: pokemon?.image || "https://via.placeholder.com/120",
    type: pokemon?.type || "normal",
  };

  return (
    <div className="card" onClick={() => onClick(displayPokemon.id)}>
      <img src={displayPokemon.image} alt={displayPokemon.name} />
      <h3>{displayPokemon.name}</h3>
      <p>Type: {displayPokemon.type}</p>
    </div>
  );
}

export default Card;
