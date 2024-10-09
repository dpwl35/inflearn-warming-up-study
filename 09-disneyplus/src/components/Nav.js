import React, { useState } from 'react';
import './Nav.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Nav({ user, onLogout }) {
  const menuItems = ['관심 콘텐츠', '영화', '시리즈', '오리지널'];
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
            <Link to='/'>
              <img
                src='https://static-assets.bamgrid.com/product/disneyplus/images/disney-plus-logo-white-update.f384bde4d5a7f1f455e2dc7d8d4348ae.png'
                alt='Disney Plus Logo'
              />
            </Link>
          </li>
          <li>
            <input
              className='search'
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

        <div className='user'>
          <img src={user.picture} alt={`profile`} />
          <button className='logout' type='button' onClick={onLogout}>
            logout
          </button>
        </div>
      </nav>
    </header>
  );
}
