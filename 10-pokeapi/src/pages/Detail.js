import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import requests from '../api/requests';

export default function Detail() {
  const { id: pokemonName } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        // 포켓몬 기본 정보 요청
        const response = await axios.get(
          requests.fetchPokemonByName(pokemonName)
        );
        setPokemon(response.data);

        // 포켓몬 설명
        const speciesResponse = await axios.get(
          requests.fetchPokemonSpecies(pokemonName)
        );

        // 설명 영어로 된 항목 필터링
        const flavorTextEntry = speciesResponse.data.flavor_text_entries.find(
          (entry) => entry.language.name === 'en'
        );

        setDescription(
          flavorTextEntry
            ? flavorTextEntry.flavor_text
            : 'No description available.'
        );
      } catch (error) {
        console.error('포켓몬 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchPokemonDetail();
  }, [pokemonName]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className='datail flex flex-col items-center'>
      <h1 className='text-3xl py-9 font-bold'>{pokemon.name}</h1>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className='w-48 h-48 mt-4'
      />
      <div className='flex gap-2'>
        {pokemon.types.map((type) => (
          <div key={type.type.name} className='bg-gray-200 px-2 py-1 rounded'>
            {type.type.name}
          </div>
        ))}
      </div>
      <div className='flex gap-9 mt-9'>
        <div className='flex flex-col items-center'>
          <p>HEIGHT</p>
          <p>{pokemon.height}</p>
        </div>
        <div className='flex flex-col items-center'>
          <p>WEIGHT</p>
          <p>{pokemon.weight}</p>
        </div>
      </div>
      <ul className='mt-9'>
        {pokemon.stats.map((stat) => (
          <li
            key={stat.stat.name}
            className='flex gap-2 items-center w-full max-w-[500px]'
          >
            <span className='w-[160px] font-bold capitalize'>
              {stat.stat.name.replace('-', ' ')}
            </span>
            <span>{stat.base_stat}</span>
            <div className='w-[150px] h-[12px] bg-gray-200 rounded-xl overflow-hidden'>
              <div
                className={`h-[12px] rounded-xl bg-${pokemon.types[0].type.name}`}
                style={{
                  width: `${(stat.base_stat / 255) * 100}%`,
                }}
              />
            </div>
            <span>255</span>
          </li>
        ))}
      </ul>
      <div className='mt-9 w-full max-w-[500px]'>{description}</div>
      <div className='mt-9 w-full max-w-[500px] flex gap-9'>
        <img
          src={`${requests.fetchPokemonImage}/${pokemon.id}.png`}
          alt={`${pokemon.name} front`}
          className='w-24 h-24'
        />
        <img
          src={`${requests.fetchPokemonImage}/back/${pokemon.id}.png`}
          alt={`${pokemon.name} back`}
          className='w-24 h-24'
        />
        <img
          src={`${requests.fetchPokemonImage}/shiny/${pokemon.id}.png`}
          alt={`${pokemon.name} shiny`}
          className='w-24 h-24'
        />
        <img
          src={`${requests.fetchPokemonImage}/back/shiny/${pokemon.id}.png`}
          alt={`${pokemon.name} shiny back`}
          className='w-24 h-24'
        />
      </div>
    </div>
  );
}
