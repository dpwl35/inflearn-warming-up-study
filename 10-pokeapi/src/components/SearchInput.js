import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/${searchTerm.toLowerCase()}`);
    }
  };

  return (
    <div className='max-w-3xl py-7 w-full flex justify-center items-center mx-auto'>
      <div className='flex w-full max-w-[600px] rounded-xl border-2 border-gray-200 overflow-hidden'>
        <input
          type='text'
          className='px-5 py-4 w-full focus:outline-none'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='포켓몬 이름을 입력하세요'
        />
        <button
          className='whitespace-nowrap px-9 bg-gray-200'
          onClick={handleSearch}
        >
          검색
        </button>
      </div>
    </div>
  );
}
