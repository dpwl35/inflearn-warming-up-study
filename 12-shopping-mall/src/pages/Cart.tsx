import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import {
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from '../features/cart/cartSlice';

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className='wrap cart'>
        <p className='none'>장바구니가 비어있습니다.</p>
      </div>
    );
  }

  return (
    <div className='wrap cart'>
      <h2>장바구니</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <div className='left'>
              <div className={`img ${item.category}`}>{item.name} 이미지</div>
              <div className='info'>
                <p>{item.category}</p>
                <p>{item.name}</p>
                <p>
                  <span>{item.price}원</span> x <span>{item.quantity}</span> ={' '}
                  <span>{item.price * item.quantity}원</span>
                </p>
              </div>
            </div>
            <div className='right'>
              <div>
                <button onClick={() => dispatch(decreaseQuantity(item.id))}>
                  -
                </button>
                <input value={item.quantity} readOnly />
                <button onClick={() => dispatch(increaseQuantity(item.id))}>
                  +
                </button>
              </div>
            </div>
            <button
              className='delete'
              onClick={() => dispatch(removeItem(item.id))}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
      <div className='add'>
        <div className='sum'>합계: {totalAmount}원</div>
        <button className='buy'>구매하기</button>
      </div>
    </div>
  );
};

export default Cart;
