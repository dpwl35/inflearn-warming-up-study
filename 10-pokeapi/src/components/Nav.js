import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <header className='px-9 w-full fixed top-0 left-0 text-lg bg-[#ef5350]'>
      <h1 className='pb-4 pt-5 text-white font-bold text-2xl'>
        <Link to='/'>Pokemon</Link>
      </h1>
    </header>
  );
}
