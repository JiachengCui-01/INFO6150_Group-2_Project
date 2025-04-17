// client/src/redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  type: null,
  userId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.loggedIn = true;
      state.type = action.payload.type;
      state.userId = action.payload.userId;
    },
    logout(state) {
      state.loggedIn = false;
      state.type = null;
      state.userId = null;
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
