import React from 'react';
import SearchInput from '../components/SearchInput';
import PokemonList from '../components/PokemonList';

export default function Main() {
  return (
    <div className='main '>
      <SearchInput />
      <PokemonList />
    </div>
  );
}
