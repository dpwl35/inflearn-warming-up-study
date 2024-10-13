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
    <div className='flex justify-center px-9 pb-9'>
      <div className='w-full max-w-[1080px] mt-4 grid grid-cols-1 justify-items-center sm:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-5 gap-6'>
        {pokemonData.map((pokemon) => {
          // 첫 번째 타입
          const type = pokemon.types[0].type.name;

          return (
            <div
              className='overflow-hidden flex flex-col w-full rounded-md shadow-md cursor-pointer'
              key={pokemon.id}
              onClick={() => navigate(`/${pokemon.name}`)}
            >
              <div className='px-3 flex justify-start pt-2'>
                <p
                  className={`border-2 flex border-gray-200 w-auto rounded-2xl text-sm`}
                >
                  <span className={`bg-${type} px-2 rounded-2xl`}>
                    {String(pokemon.id).padStart(3, '0')}
                  </span>
                  <span className='px-3'> {pokemon.name}</span>
                </p>
              </div>
              <div className='w-full flex justify-center items-center h-[120px]'>
                <img
                  src={`${requests.fetchPokemonImageGif}/${pokemon.id}.gif`}
                  alt={pokemon.name}
                />
              </div>
              <p
                className={`flex justify-end items-center gap-1 px-5 w-full text-right py-2 text-sm text-gray-400`}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 100 100'
                  width='14'
                  height='14'
                >
                  <circle
                    cx='50'
                    cy='50'
                    r='45'
                    stroke='currentColor'
                    strokeWidth='6'
                    fill='none'
                  />
                  <circle
                    cx='50'
                    cy='50'
                    r='15'
                    stroke='currentColor'
                    strokeWidth='6'
                    fill='none'
                  />
                  <line
                    x1='5'
                    y1='50'
                    x2='95'
                    y2='50'
                    stroke='currentColor'
                    strokeWidth='6'
                  />
                </svg>
                <span>PokéAPI</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
