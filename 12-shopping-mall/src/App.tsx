import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Products from './components/Products';
import Cart from './pages/Cart';
import Detail from './pages/Detail';

const App: React.FC = () => {
  return (
    <Router>
      <div className='App'>
        <Nav />

        <Routes>
          <Route path='/' element={<Products />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/detail/:id' element={<Detail />} /> {/* 상품 ID 경로 */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
