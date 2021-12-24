import { createSlice } from "@reduxjs/toolkit";

const compareSlice = createSlice({
  name: "compare",
  initialState: {
    compare_products: [],
  },
  reducers: {
    getCompareProducts(state, action) {
      if (state.compare_products.length < 4) {
        if (!state.compare_products.some((i) => i.id === action.payload.id)) {
          state.compare_products.push(action.payload.el);
        }
      } else {
        state.compare_products.splice(0, 1, action.payload.el);
      }
      localStorage.setItem(
        "compare_products",
        JSON.stringify(state.compare_products)
      );
    },
  },
});

export const { getCompareProducts } = compareSlice.actions;
export default compareSlice.reducer;
