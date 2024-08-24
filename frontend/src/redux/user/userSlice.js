import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  suggestedUsers: [],
  userProfile: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authUser: (state, action) => {
      state.currentUser = action.payload;
    },
    suggestedUsers: (state, action) => {
      state.suggestedUsers = action.payload;
    },
    getUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
  },
});

export const { authUser, suggestedUsers, getUserProfile } = userSlice.actions;

export default userSlice.reducer;
