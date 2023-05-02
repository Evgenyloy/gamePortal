import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  popupVisible: false,
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    changePopUp: (state, action) => {
      state.popupVisible =
        action.payload === false ? false : !state.popupVisible;
    },
  },
});

const { actions, reducer } = popupSlice;

export default reducer;
export const { changePopUp } = actions;
