import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import userSlice from "./userStore";
import isAuthSlice from "./isAuthStore";

export default configureStore({
  reducer: {
    productSlice,
    userSlice,
    isAuthSlice,
  },
});
