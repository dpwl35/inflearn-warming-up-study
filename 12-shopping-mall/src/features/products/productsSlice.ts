import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Product 타입 정의
export interface Product {
  id: string;
  category: string;
  name: string;
  price: number;
  description: string;
}

// ProductsState 타입 정의
interface ProductsState {
  items: Product[]; // 배열로 설정
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

// 초기 상태 설정
const initialState: ProductsState = {
  items: [], // 빈 배열로 시작
  status: 'idle',
};

// Thunk 함수 정의
export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async () => {
    const response = await fetch('/products.json'); // public 폴더의 JSON 파일을 비동기로 가져옴
    const data = await response.json(); // JSON 데이터를 파싱
    return data; // Thunk는 이 데이터를 fulfilled 상태로 반환
  }
);

// Redux 슬라이스 정의
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'; // 로딩 상태 처리
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload; // 받아온 데이터를 items에 저장
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed'; // 실패 상태 처리
      });
  },
});

export default productsSlice.reducer;
