import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// CartItem 인터페이스: 장바구니 아이템의 구조 정의
interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}
// CartState 인터페이스: cart 상태 구조 정의
interface CartState {
  items: CartItem[];
}
// 초기 상태 정의: items 배열을 빈 배열로 초기화
const initialState: CartState = {
  items: [],
};
// cartSlice 생성: initialState를 사용해 리듀서 생성
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 리듀서: 아이템을 장바구니에 추가하는 로직
    addItem: (state, action: PayloadAction<CartItem>) => {
      // 장바구니에 아이템 추가 여기서 state는 initialState
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      // 특정 아이템의 수량 1 증가
      const item = state.items.find((item) => item.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      // 특정 아이템의 수량 1 감소
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      // 특정 아이템을 장바구니에서 제거
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});
// 정의한 리듀서에 해당하는 액션 생성자들을 export
export const { addItem, increaseQuantity, decreaseQuantity, removeItem } =
  cartSlice.actions;
export default cartSlice.reducer;
