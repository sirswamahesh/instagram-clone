import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { authUser } = userSlice.actions;

export default userSlice.reducer;
