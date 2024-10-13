import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Main from './pages/Main';
import Detail from './pages/Detail';

function App() {
  return (
    <div className='App'>
      <Nav />
      <div className='wrap mt-[72px]'>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/:id' element={<Detail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
