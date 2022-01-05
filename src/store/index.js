import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import userSlice from "./userStore";
import isAuthSlice from "./isAuthStore";
import cartSlice from "./carts";
import modalCatalog from "./modalCatalog";
import compareSlice from "./compare";
import searchData from "./searchData";

export default configureStore({
  reducer: {
    productSlice,
    userSlice,
    isAuthSlice,
    cartSlice,
    modalCatalog,
    compareSlice,
    searchData,
  },
});
