const requests = {
  fetchPokemonById: (id) => `/pokemon/${id}`,
  fetchPokemonByName: (name) => `/pokemon/${name}`,
  fetchPokemonImage:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon',
  fetchPokemonSpecies: (name) => `/pokemon-species/${name}`,
};

export default requests;
