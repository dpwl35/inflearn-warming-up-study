const requests = {
  fetchPokemonById: (id) => `/pokemon/${id}`,
  fetchPokemonByName: (name) => `/pokemon/${name}`,
  fetchPokemonImage:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon',
  fetchPokemonImageGif:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated',
  fetchPokemonSpecies: (name) => `/pokemon-species/${name}`,
  fetchPokemonType: (typeName) => `/type/${typeName}`,
};

export default requests;
