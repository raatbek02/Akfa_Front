import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    authCart: [],
  },
  reducers: {
    setAuthCart(state, action) {
      state.authCart = action.payload;
    },
    minusItem(state, action) {
      state.authCart = state.authCart.map((item) =>
        action.payload === item.id
          ? { ...item, quantity: item.quantity - (item.quantity > 1 ? 1 : 0) }
          : item
      );
    },
    plusItem(state, action) {
      state.authCart = state.authCart.map((item) =>
        action.payload === item.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    },
    removeAuthCartItem(state, action) {
      state.authCart = state.authCart.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { setAuthCart, minusItem, plusItem, removeAuthCartItem } =
  cartSlice.actions;
export default cartSlice.reducer;
