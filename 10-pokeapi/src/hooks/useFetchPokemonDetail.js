import { useState, useEffect } from 'react';
import axios from '../api/axios';
import requests from '../api/requests';

export const useFetchPokemonDetail = (pokemonName) => {
  const [pokemon, setPokemon] = useState(null);
  const [description, setDescription] = useState('');
  const [damageRelations, setDamageRelations] = useState(null);

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

  return { pokemon, description, damageRelations };
};
