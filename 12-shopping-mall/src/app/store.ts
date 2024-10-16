// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import cartReducer from '../features/cart/cartSlice';

// 스토어 설정
export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});

// RootState와 AppDispatch 타입 정의
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // AppDispatch 타입을 정의하고 내보냄
