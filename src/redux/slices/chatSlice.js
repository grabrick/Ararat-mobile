// chatSlice
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: null
};

const chatSlice = createSlice({
  name: 'chatSlice',
  initialState,
  reducers: {
    chatData: (state, action) => {
      state.isCameraVisible = action.payload
    }
  },
});

export const { chatData } = chatSlice.actions;
export default chatSlice.reducer;