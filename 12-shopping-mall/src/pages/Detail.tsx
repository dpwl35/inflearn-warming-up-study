import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { addItem } from '../features/cart/cartSlice';

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // URL에서 id 파라미터 가져오기
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const product = useSelector((state: RootState) =>
    state.products.items.find((item) => item.id === id)
  );

  // 해당 상품이 장바구니에 있는지 확인
  const isInCart = useSelector((state: RootState) =>
    state.cart.items.some((item) => item.id === id)
  );

  if (!product) {
    return <p>상품을 찾을 수 없습니다.</p>;
  }

  const handleAddToCart = () => {
    const cartItem = { ...product, quantity: 1 }; // quantity 추가
    dispatch(addItem(cartItem)); // Redux에 추가
  };

  const handleGoToCart = () => {
    navigate('/cart'); // 장바구니로 이동
  };

  return (
    <div className='detail'>
      <div className={`img ${product.category}`}>{product.name} 이미지</div>
      <div className='info'>
        <div className='top'>
          <p>{product.category}</p>
          <p>{product.name}</p>
          <p>{product.price}원</p>
          <p>{product.description}</p>
        </div>
        <div className='bottom'>
          {/* 장바구니에 있는 경우 텍스트 변경 */}
          {isInCart ? (
            <button type='button' onClick={handleAddToCart}>
              이미 장바구니에 담긴 상품
            </button>
          ) : (
            <button type='button' onClick={handleAddToCart}>
              장바구니 추가
            </button>
          )}
          <button type='button' onClick={handleGoToCart}>
            장바구니로 이동
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
