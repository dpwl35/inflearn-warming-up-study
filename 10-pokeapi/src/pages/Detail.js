import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import requests from '../api/requests';
import Modal from '../components/Modal';

export default function Detail() {
  const { id: pokemonName } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [description, setDescription] = useState('');
  const [damageRelations, setDamageRelations] = useState(null); // 데미지 관계 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        // 포켓몬 기본 정보 요청 (포켓몬 이름으로 데이터 가져오기)
        const response = await axios.get(
          requests.fetchPokemonByName(pokemonName)
        );
        setPokemon(response.data);

        // 포켓몬 설명
        const speciesResponse = await axios.get(
          requests.fetchPokemonSpecies(pokemonName)
        );
        const flavorTextEntry = speciesResponse.data.flavor_text_entries.find(
          (entry) => entry.language.name === 'en'
        );

        setDescription(
          flavorTextEntry
            ? flavorTextEntry.flavor_text
            : 'No description available.'
        );

        // 포켓몬 타입에 따른 데미지 관계 가져오기
        if (response.data.types.length > 0) {
          const typeName = response.data.types[0].type.name; // 첫 번째 타입 선택
          const typeResponse = await axios.get(
            requests.fetchPokemonType(typeName)
          );
          setDamageRelations(typeResponse.data.damage_relations); // 데미지 관계 설정
        }
      } catch (error) {
        console.error('포켓몬 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchPokemonDetail();
  }, [pokemonName]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  // 모달 열기/닫기 기능
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // 이전 포켓몬 데이터로 이동 (ID로 요청)
  const handlePrev = () => {
    const prevId = pokemon.id - 1;
    if (prevId >= 1) {
      axios.get(requests.fetchPokemonById(prevId)).then((response) => {
        setIsModalOpen(false);
        navigate(`/${response.data.name.toLowerCase()}`);
      });
    }
  };

  // 다음 포켓몬 데이터로 이동 (ID로 요청)
  const handleNext = () => {
    const nextId = pokemon.id + 1;
    if (nextId <= 1010) {
      axios.get(requests.fetchPokemonById(nextId)).then((response) => {
        setIsModalOpen(false);
        navigate(`/${response.data.name.toLowerCase()}`);
      });
    }
  };

  return (
    <div className='detail relative flex flex-col items-center pb-9'>
      <h1 className='relative py-9 w-full text-3xl font-bold text-center'>
        {pokemon.name}
        <span className='absolute right-9 text-lg'>
          #{String(pokemon.id).padStart(3, '0')}
        </span>

        <button
          onClick={handleOpenModal}
          className='absolute top-16 right-9 mt-5 text-sm bg-gray-200 text-gray-600 px-4 py-2 rounded'
        >
          데미지 관계 보기
        </button>
      </h1>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className='w-48 h-48 mt-4'
      />
      <div className='flex gap-2'>
        {pokemon.types.map((type) => (
          <div
            key={type.type.name}
            className={`bg-gray-200 px-3 py-1 rounded-2xl bg-${type.type.name} text-white`}
          >
            {type.type.name}
          </div>
        ))}
      </div>
      <div className='flex gap-9 mt-9 items-center'>
        <div className='flex flex-col items-center'>
          <p className='text-sm font-bold'>HEIGHT</p>
          <p>{pokemon.height} m</p>
        </div>
        <div className='flex flex-col items-center'>
          <p className='text-sm font-bold'>WEIGHT</p>
          <p>{pokemon.weight} kg</p>
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
            <span className='w-[26px]'>{stat.base_stat}</span>
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
      <button
        type='button'
        className='prev absolute left-9 top-1/2 -translate-y-1/2 cursor-pointer'
        onClick={handlePrev}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 100 100'
          width='50'
          height='50'
        >
          <polyline
            points='60,20 30,50 60,80'
            stroke='black'
            strokeWidth='8'
            fill='none'
          />
        </svg>
      </button>
      <button
        type='button'
        className='next absolute right-9 top-1/2 -translate-y-1/2 rotate-180 cursor-pointer'
        onClick={handleNext}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 100 100'
          width='50'
          height='50'
        >
          <polyline
            points='60,20 30,50 60,80'
            stroke='black'
            strokeWidth='8'
            fill='none'
          />
        </svg>
      </button>

      {/* 모달이 열렸을 때만 렌더링 */}
      {isModalOpen && (
        <Modal damageRelations={damageRelations} onClose={handleCloseModal} />
      )}
    </div>
  );
}
