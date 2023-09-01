import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCameraVisible: false,
  image: ''
};

const cameraSlice = createSlice({
  name: 'cameraSlice',
  initialState,
  reducers: {
    cameraVisible: (state, action) => {
      state.isCameraVisible = action.payload
    },
    setCameraImg: (state, action) => {
      state.image = action.payload
    }
  },
});

export const { cameraVisible, setCameraImg } = cameraSlice.actions;
export default cameraSlice.reducer;