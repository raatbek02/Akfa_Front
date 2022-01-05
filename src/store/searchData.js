import { createSlice } from "@reduxjs/toolkit";

const products = localStorage.getItem("searched__products");

const SearchDataSlice = createSlice({
  name: "searchData",
  initialState: {
    searched_products: (products && JSON.parse(products)) || [],
  },
  reducers: {
    addSearchProducts(state, action) {
      state.searched_products = action.payload;

      localStorage.setItem(
        "searched__products",
        JSON.stringify(state.searched_products)
      );
    },
  },
});

export const { addSearchProducts } = SearchDataSlice.actions;
export default SearchDataSlice.reducer;
