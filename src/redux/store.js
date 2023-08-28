import { configureStore } from '@reduxjs/toolkit';
import contextMenuSlice from './slices/contextMenuSlice';
import cameraSlice from './slices/cameraSlice'
import authSlice from './slices/authSlice'
import activeBtnSlice from './slices/activeBtnSlice'
import chatSlice from './slices/chatSlice'

const store = configureStore({
  reducer: {
    contextMenuSlice,
    cameraSlice,
    authSlice,
    activeBtnSlice,
    chatSlice
  },
});

export default store;