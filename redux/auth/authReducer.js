import { createSlice } from "@reduxjs/toolkit";

const state = {
  userId: null,
  login: null,
  userEmail: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: state,

  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      login: payload.login,
      userEmail: payload.userEmail,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => state,
  },
});
export const authReducer = authSlice.reducer;
