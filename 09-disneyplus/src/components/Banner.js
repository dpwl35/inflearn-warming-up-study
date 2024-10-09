import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import requests from '../api/requests';
import styled from 'styled-components';
import './Banner.css';

export default function Banner() {
  const [movie, setMovie] = useState([]);
  const [isClicked, setidClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    //현재 상영중인 영화 정보 가져오기
    const request = await axios.get(requests.fetchNowPlaying);
    // console.log(request);

    //여러 영화 중 영화 하나의 ID를 가져오기
    const movieId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ].id;

    //특정 영화 상세 정보
    const { data: movieDeatail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_reponse: 'videos' },
    });

    setMovie(movieDeatail);
  };

  if (!isClicked) {
    return (
      <div
        className='banner'
        style={{
          backgroundPosition: 'top center',
          backgroundSize: 'cover',
        }}
      >
        <div className='banner-area'>
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt='movie.name'
          />
        </div>
        <div className='banner-contents'>
          <h2 className='banner-title'>
            {movie.title || movie.name || movie.original_name}
          </h2>

          <div className='banner-buttons'>
            <button
              className='banner-button_play'
              onClick={() => setidClicked(true)}
            >
              Play
            </button>
          </div>

          <h1 className='banner-description'>{movie.overview}</h1>
        </div>
      </div>
    );
  } else {
    return <Container>clicked</Container>;
  }
}

const Container = styled.div`
  background: red;
`;
