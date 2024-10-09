import React, { useState } from 'react';
import './Nav.css';
import { useNavigate } from 'react-router-dom';

export default function Nav() {
  const menuItems = ['홈', '검색', '관심 콘텐츠', '영화', '시리즈', '오리지널'];
  const [searchValue, setsearchValue] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setsearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  return (
    <header>
      <nav>
        <ul className='menu'>
          <li className='menu-item' onClick={() => window.location.reload()}>
            <img
              src='https://static-assets.bamgrid.com/product/disneyplus/images/disney-plus-logo-white-update.f384bde4d5a7f1f455e2dc7d8d4348ae.png'
              alt='Disney Plus Logo'
            />
          </li>
          <li>
            <input
              value={searchValue}
              onChange={handleChange}
              type='text'
              placeholder='영화를 검색해주세요.'
            />
          </li>
          {menuItems.map((item, index) => (
            <li key={index} className='menu-item'>
              {item}
            </li>
          ))}
        </ul>

        <div className='user'>유저</div>
      </nav>
    </header>
  );
}
