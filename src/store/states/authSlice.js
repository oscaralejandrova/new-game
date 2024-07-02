import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    refreshToken: null,
  },
  reducers: {
    setTokens: (state, action) => {
      state.token = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
    },
  },
});

export const { setTokens, logout } = authSlice.actions;
export const selectToken = (state) => state.auth.token;
export default authSlice.reducer;
