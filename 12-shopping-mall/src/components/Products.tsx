import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice';
import { RootState, AppDispatch } from '../app/store';
import { Product } from '../features/products/productsSlice'; // Product 타입 가져오기

const Products: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const products: Product[] = useSelector(
    (state: RootState) => state.products.items
  );
  const status = useSelector((state: RootState) => state.products.status);

  // 카테고리 데이터 정의
  const categories = ['모두', '전자기기', '쥬얼리', '남성의류', '여성의류'];

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading products.</div>;
  }

  return (
    <div className='products'>
      <h2>Products</h2>

      {/* 카테고리 리스트 */}
      <ul className='products-category'>
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>

      <div className='products-list'>
        <div>
          Showing: <span>{products.length}</span> Items
        </div>
        <div className='products-area'>
          {products.map((product, index) => (
            <div key={index} className={`products-item ${product.category}`}>
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
