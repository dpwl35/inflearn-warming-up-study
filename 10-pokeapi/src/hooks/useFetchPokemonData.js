import { useState, useEffect } from 'react';
import axios from '../api/axios';
import requests from '../api/requests';

export const useFetchPokemonData = (pageNumber) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPokemonData = async () => {
      setIsLoading(true);
      try {
        const promises = [];
        // 한 페이지당 20개의 포켓몬 데이터 가져오기
        const start = (pageNumber - 1) * 20 + 1; // 예: 1 페이지면 1~20, 2페이지면 21~40
        const end = pageNumber * 20;

        for (let i = start; i <= end; i++) {
          promises.push(axios.get(requests.fetchPokemonById(i)));
        }
        const responses = await Promise.all(promises);
        const newData = responses.map((response) => response.data);
        setPokemonData((prevData) => [...prevData, ...newData]); // 기존 데이터에 추가
      } catch (error) {
        console.error('포켓몬 데이터를 가져오는 중 오류 발생:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonData();
  }, [pageNumber]);

  return { pokemonData, isLoading };
};
