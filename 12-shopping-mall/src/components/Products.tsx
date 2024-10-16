import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // useNavigate import
import { fetchProducts } from '../features/products/productsSlice';
import { RootState, AppDispatch } from '../app/store';
import { Product } from '../features/products/productsSlice';

const Products: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate 훅 사용
  const products: Product[] = useSelector(
    (state: RootState) => state.products.items
  );
  const status = useSelector((state: RootState) => state.products.status);

  // 카테고리 데이터 정의
  const categories = ['모두', '전자기기', '쥬얼리', '남성의류', '여성의류'];

  // 선택된 카테고리 상태 관리
  const [selectedCategory, setSelectedCategory] = useState<string>('모두');

  // 컴포넌트가 처음 마운트될 때 제품 데이터를 가져옴
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  // 로딩 중일 때 표시할 UI
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  // 로딩 실패 시 표시할 UI
  if (status === 'failed') {
    return <div>Error loading products.</div>;
  }

  // 선택된 카테고리에 따라 필터링된 제품 리스트 반환
  const filteredProducts = products.filter((product) => {
    if (selectedCategory === '모두') return true;
    if (selectedCategory === '전자기기')
      return product.category === 'electronics';
    if (selectedCategory === '쥬얼리') return product.category === 'jewelry';
    if (selectedCategory === '남성의류') return product.category === 'men';
    if (selectedCategory === '여성의류') return product.category === 'women';
    return false;
  });

  // 상품 클릭 시 페이지 이동 처리
  const handleProductClick = (id: string) => {
    navigate(`/detail/${id}`); // 상품 ID 경로로 이동
  };

  return (
    <div className='wrap products'>
      <h2>Products</h2>

      {/* 카테고리 리스트 */}
      <ul className='products-category'>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => setSelectedCategory(category)}
            style={{
              cursor: 'pointer',
              fontWeight: selectedCategory === category ? 'bold' : 'normal',
            }}
          >
            {category}
          </li>
        ))}
      </ul>

      {/* 상품 리스트 */}
      <div className='products-list'>
        <div>
          Showing: <span>{filteredProducts.length}</span> Items
        </div>
        <div className='products-area'>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`products-item ${product.category}`}
              onClick={() => handleProductClick(product.id)} // 클릭 시 이동
              style={{ cursor: 'pointer' }}
            >
              <div className='img'>{product.name} 이미지</div>
              <div className='name'>{product.name}</div>
              <div className='area'>
                <button type='button'>장바구니</button>
                <div className='price'>{product.price}원</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
