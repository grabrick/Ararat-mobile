import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  chatId: null,
  openedChat: false,
  contextConfig: null,
  isVisibleMenu: false,
  touchMessage: null,
  reply: null,
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
    setConfig: (state, action) => {
      const data = action.payload;
      // console.log(data);
      state.contextConfig = data.contextConfig;
      state.isVisibleMenu = data.isVisibleMenu;
      state.touchMessage = data.touchMessage;
    },
    openedChatCheck: (state, action) => {
      state.openedChat = action.payload
    },
  },
});

export const { updateData, openedChatCheck, setConfig } = contextMenuSlice.actions;
export default contextMenuSlice.reducer;