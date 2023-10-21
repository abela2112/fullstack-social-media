import { createSlice } from "@reduxjs/toolkit";

const intialState = {
  mode: "light",
  user: null,
  posts: [],
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  intialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends not available");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    updatePost: (state, action) => {
      const updatePost = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        else return post;
      });
      state.posts = updatePost;
    },
  },
});
export const {
  setFriends,
  setLogin,
  setLogout,
  setMode,
  setPosts,
  updatePost,
} = authSlice.actions;

export default authSlice.reducer;
