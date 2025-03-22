import { createSlice } from "@reduxjs/toolkit";


const initialState = {

  users: [],
  messages: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,
 
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload); // Append new message
    },

    setUsers: (state, action) => {
      state.users = action.payload;
    },

    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});
export const { setMessages, setUsers, addMessage, setSelectedUser } =
  messageSlice.actions;

export default messageSlice.reducer;
