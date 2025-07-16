import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  phoneNumber: string;
  countryCode: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  phoneNumber: "",
  countryCode: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.phoneNumber = action.payload.phoneNumber;
      state.countryCode = action.payload.countryCode;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.phoneNumber = "";
      state.countryCode = "";
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
