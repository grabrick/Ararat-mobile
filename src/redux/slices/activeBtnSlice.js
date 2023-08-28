import { createSlice } from '@reduxjs/toolkit';
import Man from '../../../assets/images/Man.png';
import Blank from '../../../assets/images/blank.png';
import Group from '../../../assets/images/group.png';
import Folder from '../../../assets/images/folder.png';
import Chat from '../../../assets/images/chat.png'
import ManActive from '../../../assets/images/ManActive.png';
import BlankActive from '../../../assets/images/blankActive.png';
import GroupActive from '../../../assets/images/groupActive.png';
import FolderActive from '../../../assets/images/folderActive.png';
import ChatActive from '../../../assets/images/chatActive.png'

const initialState = {
    activeButton: [
        { imageSource: Group, isActive: false, activeSource: GroupActive, id: '1' },
        { imageSource: Man, isActive: false, activeSource: ManActive, id: '1' },
        { imageSource: Folder, isActive: false, activeSource: FolderActive, id: '1' },
        { imageSource: Chat, isActive: false, activeSource: ChatActive, id: 'chat' },
        { imageSource: Blank, isActive: false, activeSource: BlankActive, id: '1' },
    ]
};

const activeBtnSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setActiveButton: (state, action) => {
      state.activeButton = action.payload
    }
  },
});

export const { setActiveButton } = activeBtnSlice.actions;
export default activeBtnSlice.reducer;