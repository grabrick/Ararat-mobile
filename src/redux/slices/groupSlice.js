//groupSlice
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  findGroup: []
};

const groupSlice = createSlice({
  name: 'groupSlice',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload
    },
    findGroups: (state, action) => {
      const searchTerm = action.payload;

      if (searchTerm.length === 0) {
        state.findGroup = [];
      }     

      const filteredGroups = state?.data?.chats?.filter((group) => {
        return group?.name && group?.name?.includes(searchTerm);
      });

      return {
        ...state,
        findGroup: filteredGroups,
      };
    }
  },
});

export const { setData, findGroups } = groupSlice.actions;
export default groupSlice.reducer;