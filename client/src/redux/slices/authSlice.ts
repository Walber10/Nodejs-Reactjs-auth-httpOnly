import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  isAuthenticated: boolean;
  token: string | null;
};

const initialState: InitialState = {
  isAuthenticated: localStorage.getItem("token") ? true : false,
  token: localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addAuth: (state, action: PayloadAction<InitialState>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token!);
    },
    removeAuth: (state) => {
      state.isAuthenticated = false;
      state.token = "";
      localStorage.removeItem("token");
    },
  },
});

export const { addAuth, removeAuth } = authSlice.actions;

export const selectCurrentToken = (state: { auth: InitialState }) =>
  state.auth.token;

export default authSlice.reducer;
