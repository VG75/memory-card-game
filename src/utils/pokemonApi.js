// Generate array of random Pokemon IDs
export const generateRandomPokemonIds = (count = 15) => {
  return Array.from(
    { length: count },
    () => Math.floor(Math.random() * 898) + 1
  );
};

// Fetch single Pokemon data
export const fetchPokemonById = async (id) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon ${id}`);
    }
    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      image: data.sprites.front_default,
      type: data.types[0].type.name,
    };
  } catch (error) {
    console.error(`Error fetching Pokemon ${id}:`, error);
    throw error;
  }
};

// Fetch multiple Pokemon
export const fetchMultiplePokemon = async (ids) => {
  try {
    const pokemonData = await Promise.all(
      ids.map((id) => fetchPokemonById(id))
    );
    return pokemonData;
  } catch (error) {
    console.error("Error fetching multiple Pokemon:", error);
    throw error;
  }
};
