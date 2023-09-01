// chatSlice
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  chatId: null
};

const chatSlice = createSlice({
  name: 'chatSlice',
  initialState,
  reducers: {
    chatData: (state, action) => {
      state.data = action.payload
    },
    getChatId: (state, action) => {
      state.chatId = action.payload
    }
  },
});

export const { chatData, getChatId } = chatSlice.actions;
export default chatSlice.reducer;