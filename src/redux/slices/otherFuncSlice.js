// chatSlice
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isActiveKeyboard: false,
  isActiveSearchBar: false,
  imageUri: {}
};

const otherFuncSlice = createSlice({
  name: 'otherFuncSlice',
  initialState,
  reducers: {
    isActive: (state, action) => {
      state.isActiveKeyboard = action.payload
    },
    isActiveSearch: (state, action) => {
      state.isActiveSearchBar = action.payload
    },
    setUriImage: (state, action) => {
      state.imageUri = action.payload
    }
  },
});

export const { isActive, isActiveSearch, setUriImage } = otherFuncSlice.actions;
export default otherFuncSlice.reducer;