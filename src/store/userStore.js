import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    setIsUser(state, action) {
      return {
        user: action.payload,
      };
    },
  },
});

export const { setIsUser } = userSlice.actions;
export default userSlice.reducer;
