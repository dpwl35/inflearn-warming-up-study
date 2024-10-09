import React, { useState, useEffect } from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';

const Layout = ({ user, onLogout }) => {
  return (
    <div>
      <Nav user={user} onLogout={onLogout} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  const CLIENT_ID = process.env.REACT_APP_GOOGLE_ID;
  const CLIENT_SECRET = process.env.REACT_APP_GOOGLE_PW;
  const REDIRECT_URI = 'http://localhost:3000';
  const SCOPE = process.env.REACT_APP_GOOGLE_SCOPE;

  const handleGoogleLogin = () => {
    const googleOAuthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}`;
    window.location.href = googleOAuthUrl;
  };

  const handleLogout = () => {
    // 로그아웃 시 로컬 스토리지에서 사용자 정보 삭제
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    setUser(null);
    setLoggedIn(false);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedAccessToken = localStorage.getItem('access_token');

    if (storedUser && storedAccessToken) {
      setUser(JSON.parse(storedUser));
      setLoggedIn(true);
    } else {
      const urlParams = new URLSearchParams(location.search);
      const authorizationCode = urlParams.get('code');

      if (authorizationCode) {
        const tokenEndpoint = 'https://accounts.google.com/o/oauth2/token';
        const data = {
          code: authorizationCode,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          redirect_uri: REDIRECT_URI,
          grant_type: 'authorization_code',
        };

        axios
          .post(tokenEndpoint, data)
          .then((response) => {
            const accessToken = response.data.access_token;

            axios
              .get('https://www.googleapis.com/oauth2/v1/userinfo', {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              })
              .then((userInfoResponse) => {
                const userInfo = userInfoResponse.data;
                setUser({
                  name: userInfo.name,
                  picture: userInfo.picture,
                });
                setLoggedIn(true);

                localStorage.setItem(
                  'user',
                  JSON.stringify({
                    name: userInfo.name,
                    picture: userInfo.picture,
                  })
                );
                localStorage.setItem('access_token', accessToken);
              })
              .catch((error) => {
                console.error('유저 정보 가져오기 오류:', error);
              });
          })
          .catch((error) => {
            console.error('토큰 교환 오류:', error);
          });
      }
    }
  }, [location.search, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI]);

  return (
    <div className='wrap'>
      {loggedIn ? (
        <Routes>
          <Route
            path='/'
            element={<Layout user={user} onLogout={handleLogout} />}
          >
            <Route index element={<MainPage />} />
            <Route path=':movieId' element={<DetailPage />} />
            <Route path='search' element={<SearchPage />} />
          </Route>
        </Routes>
      ) : (
        <div className='login'>
          <img
            className='login-logo'
            src='https://cnbl-cdn.bamgrid.com/assets/478bf74ef5ffc184e7c96808eef869a4ca967cbcc5a8db8f7e3c4005d93bbfd5/original'
            alt='Disney+'
          />
          <h1>
            이 모든 이야기가 여기에 <br /> 지금 스트림이 중
          </h1>
          <button onClick={handleGoogleLogin}>로그인</button>
        </div>
      )}
    </div>
  );
}
