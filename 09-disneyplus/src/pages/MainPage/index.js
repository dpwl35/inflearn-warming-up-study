import React from 'react';
import Banner from '../../components/Banner';
import Row from '../../components/Row';
import requests from '../../api/requests';
import Genre from '../../components/Genre';

export default function MainPage() {
  return (
    <div>
      <Banner />
      <Genre />
      <Row title='Trending Now' id='TN' fetchUrl={requests.fetchTrending} />
      <Row
        title='Top Rated'
        id='TR'
        fetchUrl={requests.fetchTopRated}
        isLargeRow
      />
      <Row
        title='Action Movies'
        id='AM'
        fetchUrl={requests.fetchActionMovies}
      />
      <Row
        title='Comedy Movies'
        id='CM'
        fetchUrl={requests.fetchComedyMovies}
      />
    </div>
  );
}
