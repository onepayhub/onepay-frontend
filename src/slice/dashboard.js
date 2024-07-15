import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  states: {
    showOnepay: false,
    accountDetails: [],
  },
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialState,
  reducers: {
    setShowOnepay: (state, action) => {
      state.states.showOnepay = action.payload;
    },
    setAccountDetails: (state, action) => {
      state.states.accountDetails = action.payload;
    },
  },
});

export const { setShowOnepay, setAccountDetails } = dashboardSlice.actions;
