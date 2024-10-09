import React, { useEffect, useState, useRef } from 'react';
import axios from '../api/axios';
import './Row.css';
import MovieModal from './MovieModal';

export default function Row({ title, id, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  const sliderRef = useRef(null);

  const fetchMovieData = async () => {
    try {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    } catch (error) {
      console.error('Failed to fetch movies', error);
    }
  };

  useEffect(() => {
    fetchMovieData();
  }, []);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= window.innerWidth - 71;
      console.log(sliderRef);
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += window.innerWidth - 71;
    }
  };

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  return (
    <section className='row'>
      <h2 className='row-title'>{title}</h2>
      <div className='slider'>
        <div className='slider-arrow_left'>
          <button type='button' className='arrow' onClick={scrollLeft}>
            <svg
              aria-hidden='true'
              color='white'
              role='img'
              viewBox='0 0 36 36'
            >
              <path
                d='M13.065 7.65c-.538-.578-.355-1.433.325-1.81a1.44 1.44 0 0 1 .72-.182c.398 0 .786.15 1.048.437L25.327 17.07a1.126 1.126 0 0 1 0 1.555L15.155 29.568c-.438.468-1.198.563-1.767.25-.681-.377-.863-1.23-.325-1.809l9.446-10.164L13.065 7.65zm11.211 10.393a.31.31 0 0 1 0-.391l-.181.194.181.197zM14.081 28.564c.01.006.053 0 .028.027a.07.07 0 0 0-.028-.027zm.024-21.5a.95.95 0 0 1 .007.008l-.007-.007z'
                fill='white'
              ></path>
            </svg>
          </button>
        </div>

        <div id={id} className='slider-area' ref={sliderRef}>
          {movies.map((movie) => (
            <div className='poster' key={movie.id}>
              <img
                className={`${
                  isLargeRow ? 'poster-largeRow' : 'poster-backdrop'
                }`}
                src={`https://image.tmdb.org/t/p/original/${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
                onClick={() => handleClick(movie)}
              />
            </div>
          ))}
        </div>

        <div className='slider-arrow_right'>
          <button type='button' className='arrow' onClick={scrollRight}>
            <svg
              aria-hidden='true'
              color='white'
              role='img'
              viewBox='0 0 36 36'
            >
              <path
                d='M13.065 7.65c-.538-.578-.355-1.433.325-1.81a1.44 1.44 0 0 1 .72-.182c.398 0 .786.15 1.048.437L25.327 17.07a1.126 1.126 0 0 1 0 1.555L15.155 29.568c-.438.468-1.198.563-1.767.25-.681-.377-.863-1.23-.325-1.809l9.446-10.164L13.065 7.65zm11.211 10.393a.31.31 0 0 1 0-.391l-.181.194.181.197zM14.081 28.564c.01.006.053 0 .028.027a.07.07 0 0 0-.028-.027zm.024-21.5a.95.95 0 0 1 .007.008l-.007-.007z'
                fill='white'
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </section>
  );
}
