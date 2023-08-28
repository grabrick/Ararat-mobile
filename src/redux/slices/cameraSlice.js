import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isCameraVisible: false
};

const cameraSlice = createSlice({
  name: 'cameraSlice',
  initialState,
  reducers: {
    cameraVisible: (state, action) => {
      state.isCameraVisible = action.payload
    }
  },
});

export const { cameraVisible } = cameraSlice.actions;
export default cameraSlice.reducer;