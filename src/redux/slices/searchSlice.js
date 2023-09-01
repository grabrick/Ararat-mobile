import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchResults: null
};

const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload
    }
  },
});

export const { setSearchResults } = searchSlice.actions;
export default searchSlice.reducer;