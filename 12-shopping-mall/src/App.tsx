import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Products from './components/Products';
import Cart from './components/Cart';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Nav />

        <Routes>
          <Route path='/' element={<Products />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
