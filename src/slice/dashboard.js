import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  states: {
    showOnepay: false,
    accountDetails: [],
    transferDetails: {},
    showRequestModal: false,
    approvePayment: false,
    showNotification: false,
    notificationData: [],
    selectedNotificationId: '',
    showPayment: false,
    paymentSuccess: false,
    showShareCost: false,
    showServicePayment: false,
    serviceName: "",
    showShareModal: false,
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
    setNotificationData: (state, action) => {
      state.states.notificationData = [...state.states.notificationData, action.payload];
    },
    setShowNotification: (state, action) => {
      state.states.showNotification = action.payload;
    },
    setApprovePayment: (state, action) => {
      state.states.approvePayment = action.payload;
    },
    setSelectedNotificationId: (state, action) => {
      state.states.selectedNotificationId = action.payload;
    },
    setShowPayment: (state, action) => {
      state.states.showPayment = action.payload;
    },
    setPaymentSuccess: (state, action) => {
      state.states.paymentSuccess = action.payload;
    },
    setShowShareCost: (state, action) => {
      state.states.showShareCost = action.payload;
    },
    setShowServicePayment: (state, action) => {
      state.states.showServicePayment = action.payload;
    },
    setServiceName: (state, action) => {
      state.states.serviceName = action.payload;
    },
    setShowShareModal: (state, action) => {
      state.states.showShareModal = action.payload;
    },
  },
});

export const {
  setShowOnepay,
  setAccountDetails,
  setTransferDetails,
  setShowRequestModal,
  setNotificationData,
  setShowNotification,
  setApprovePayment,
  setSelectedNotificationId,
  setShowPayment,
  setPaymentSuccess,
  setShowShareCost,
  setShowServicePayment,
  setServiceName,
  setShowShareModal,
} = dashboardSlice.actions;
