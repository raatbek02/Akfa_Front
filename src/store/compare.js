import { createSlice } from "@reduxjs/toolkit";

const products = localStorage.getItem("compare_products");

const compareSlice = createSlice({
  name: "compare",
  initialState: {
    compare_products: (products && JSON.parse(products)) || [],
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
    removeCompareItem(state, action) {
      state.compare_products = state.compare_products.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem(
        "compare_products",
        JSON.stringify(state.compare_products)
      );
    },
  },
});

export const { getCompareProducts, removeCompareItem } = compareSlice.actions;
export default compareSlice.reducer;
