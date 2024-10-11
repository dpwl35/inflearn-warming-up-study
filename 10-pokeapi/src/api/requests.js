const requests = {
  fetchPokemonById: (id) => `/pokemon/${id}`,
  fetchPokemonByName: (name) => `/pokemon/${name}`,
  fetchPokemonImage: (id) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
};

export default requests;
