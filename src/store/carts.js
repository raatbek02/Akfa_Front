import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    auth_items: [],
  },
  reducers: {
    setAuthCart(state, action) {
      return {
        auth_items: action.payload,
      };
    },
  },
});

export const { setAuthCart } = cartSlice.actions;
export default cartSlice.reducer;
