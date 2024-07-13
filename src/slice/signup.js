import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  states: {
    signupDetails: [],
    user: [],
    accessToken: "",
  },
};

export const signupSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupDetails: (state, action) => {
      state.states.signupDetails = action.payload;
    },
    setUser: (state, action) => {
      state.states.user = action.payload;
    },
    setAccessToken: (state, action) => {
      state.states.accessToken = action.payload;
    },
  },
});

export const { setSignupDetails, setUser, setAccessToken } = signupSlice.actions;
