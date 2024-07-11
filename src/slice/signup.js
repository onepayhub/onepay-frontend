import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  states: {
    signupDetails: [],
    accessToken: "",
  },
};

export const signupSlice = createSlice({
  name: "signup",
  initialState: initialState,
  reducers: {
    setSignupDetails: (state, action) => {
      state.states.signupDetails = action.payload;
    },
    setAccessToken: (state, action) => {
      state.states.accessToken = action.payload;
    },
  },
});

export const { setSignupDetails, setAccessToken } = signupSlice.actions;
