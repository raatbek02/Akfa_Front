import { createSlice } from "@reduxjs/toolkit";

const modalCatalog = createSlice({
  name: "modalCatalog",
  initialState: {
    modalCatalog: false,
    subCategory_id: 1,
    underSubcat_id: 1,
  },
  reducers: {
    setModalCatalog(state, action) {
      state.modalCatalog = !state.modalCatalog;
    },
    setSubCategory_id(state, action) {
      state.subCategory_id = action.payload;
    },
    setUnderSubcat_id(state, action) {
      state.underSubcat_id = action.payload;
    },
  },
});

export const { setModalCatalog, setSubCategory_id, setUnderSubcat_id } =
  modalCatalog.actions;
export default modalCatalog.reducer;
