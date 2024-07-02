// userSlice.js (asegurándote de que tienes esta estructura)
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    checkAuth(state) {
      const token = localStorage.getItem('access');
      const timestamp = localStorage.getItem('timestamp');
      const now = new Date().getTime();
      if (token && timestamp && parseInt(timestamp) > now) {
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
      }
    },
  },
});

export const { login, logout, checkAuth } = userSlice.actions;
export default userSlice.reducer;
