import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  chatId: null,
  openedChat: false,
  reply: null
};

const contextMenuSlice = createSlice({
  name: 'contextMenuSlice',
  initialState,
  reducers: {
    updateData: (state, action) => {
      const data = action.payload
      state.data = data.chat;
      state.chatId = data.chatId;
    },
    openedChatCheck: (state, action) => {
      state.openedChat = action.payload
    }
  },
});

export const { updateData, openedChatCheck } = contextMenuSlice.actions;
export default contextMenuSlice.reducer;