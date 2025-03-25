import { createSlice } from "@reduxjs/toolkit";
import { getSocket, disconnectSocket } from "../socketio"; // Your socket logic
let socketClient = null;
const initialState = {
  mode: "light",
  user: null,
  posts: [],
  onlineUsers: null,
  userPosts: [],
  token: null,
  // socketClient: null, // Ensure this matches with the reducer's state reference
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      // Connect the socket after user logs in
      if (!socketClient) {
        console.log("Connecting ..socket user id", state.user._id);
        socketClient = getSocket({
          userId: window.localStorage.getItem("userId"),
        });
        socketClient.connect();
      }
    },
    updateUser: (state, action) => {
      state.user = action.payload.user;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      // Disconnect the socket when the user logs out
      if (socketClient) {
        disconnectSocket();
        socketClient = null;
      }
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends || [];
      } else {
        console.error("User friends not available");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setUserPosts: (state, action) => {
      state.userPosts = action.payload.posts;
    },
    updateUser: (state, action) => {
      state.user = action.payload.user;
    },
    updatePost: (state, action) => {
      const updatePost = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        else return post;
      });
      state.posts = updatePost;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const {
  setFriends,
  setLogin,
  updateUser,
  setLogout,
  setMode,
  setPosts,
  updatePost,
  setOnlineUsers,
  setUserPosts,
} = authSlice.actions;

export default authSlice.reducer;
