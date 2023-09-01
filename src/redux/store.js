import { configureStore } from '@reduxjs/toolkit';
import contextMenuSlice from './slices/contextMenuSlice';
import cameraSlice from './slices/cameraSlice'
import authSlice from './slices/authSlice'
import activeBtnSlice from './slices/activeBtnSlice'
import chatSlice from './slices/chatSlice'
import otherFuncSlice from './slices/otherFuncSlice';
import searchSlice from './slices/searchSlice'
import groupSlice from './slices/groupSlice'

const store = configureStore({
  reducer: {
    contextMenuSlice,
    cameraSlice,
    authSlice,
    activeBtnSlice,
    chatSlice,
    otherFuncSlice,
    searchSlice,
    groupSlice
  },
});

export default store;