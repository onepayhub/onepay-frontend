import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  states: {
    signupDetails: [],
  },
};

export const signupSlice = createSlice({
  name: "signup",
  initialState: initialState,
  reducers: {
    setSignupDetails: (state, action) => {
      state.states.signupDetails = action.payload;
    },
  },
});

export const { setSignupDetails } = signupSlice.actions;
