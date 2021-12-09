import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "user",
  initialState: {
    carts: {},
    items: [],
  },
  reducers: {
    setCarts(state, action) {
      return {
        carts: action.payload,
      };
    },
    setCartItems(state, action) {
      return {
        items: action.payload,
      };
    },
  },
});

export const { setIsUser } = cartSlice.actions;
export default cartSlice.reducer;
