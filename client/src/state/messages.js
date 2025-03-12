import { createSlice } from "@reduxjs/toolkit";
import { getSocket } from "socketio";

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
   
    
    setUsers: (state, action) => {
      state.users = action.payload;
    },

    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
   
    
    
  },
});
export const {
  setMessages,
  setUsers,
  setSelectedUser,

} = messageSlice.actions;

export default messageSlice.reducer;
