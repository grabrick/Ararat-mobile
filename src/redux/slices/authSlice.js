import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    authData: []
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.authData = action.payload
    }
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;