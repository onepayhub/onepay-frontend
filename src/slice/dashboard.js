import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  states: {
    showOnepay: false,
    accountDetails: [],
    transferDetails: {},
    showRequestModal: false,
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
    setTransferDetails: (state, action) => {
      state.states.transferDetails = action.payload;
    },
    setShowRequestModal: (state, action) => {
      state.states.showRequestModal = action.payload;
    },
  },
});

export const {
  setShowOnepay,
  setAccountDetails,
  setTransferDetails,
  setShowRequestModal,
} = dashboardSlice.actions;
