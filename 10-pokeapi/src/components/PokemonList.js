import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import requests from '../api/requests';
import './PokemonList.css';

export default function PokemonList() {
  const [pokemonData, setPokemonData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const promises = [];
        for (let i = 1; i <= 20; i++) {
          promises.push(axios.get(requests.fetchPokemonById(i)));
        }
        const responses = await Promise.all(promises);
        const data = responses.map((response) => response.data);
        setPokemonData(data);
      } catch (error) {
        console.error('포켓몬 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchPokemonData();
  }, []);

  return (
    <div className='flex justify-center px-9'>
      <div className='w-full mt-4 grid grid-cols-1 justify-items-center sm:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-5 gap-6'>
        {pokemonData.map((pokemon) => {
          // 첫 번째 타입
          const type = pokemon.types[0].type.name;

          return (
            <div
              className='overflow-hidden flex flex-col w-full rounded-2xl shadow-md cursor-pointer'
              key={pokemon.id}
              onClick={() => navigate(`/${pokemon.name.toLowerCase()}`)}
            >
              <div className='px-5 text-right'># {pokemon.id}</div>
              <div className='w-full flex justify-center items-center'>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              </div>
              <p
                className={` px-5 w-full text-center py-2 bg-${type} text-white`}
              >
                {pokemon.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
