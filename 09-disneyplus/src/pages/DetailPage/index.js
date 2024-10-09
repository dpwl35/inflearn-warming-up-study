import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from '../../api/axios';

export default function DetailPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState({});
  const imageUrl = location.state?.imageUrl; // 전달된 imageUrl 사용

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`/movie/${movieId}`);
      setMovie(request.data);
    }
    fetchData();
  }, [movieId]);

  if (!movie) return <div>...loading</div>;

  return (
    <section>
      <img
        className='modal__poster-img'
        src={
          imageUrl ||
          `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
        }
        alt='poster'
      />
    </section>
  );
}
