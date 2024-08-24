import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  posts: [],
  selectedPost: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPosts: (state, action) => {
      state.posts = action.payload;
    },
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
  },
});

export const { getPosts, setSelectedPost } = postSlice.actions;

export default postSlice.reducer;
