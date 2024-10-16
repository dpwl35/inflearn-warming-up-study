import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../app/store';

const Nav: React.FC = () => {
  // Redux에서 장바구니 아이템 수량 계산
  const totalItems = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <nav>
      <ul>
        <li>
          <h1>
            <Link to='/'>Shop</Link>
          </h1>
        </li>
        <li>
          <Link to='/cart'>Cart : ({totalItems})</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
