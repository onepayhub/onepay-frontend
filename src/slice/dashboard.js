import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  states: {
    showOnepay: false,
  },
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialState,
  reducers: {
    setShowOnepay: (state, action) => {
      state.states.showOnepay = action.payload;
    },
  },
});

export const { setShowOnepay } = dashboardSlice.actions;
