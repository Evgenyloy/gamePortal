import { createReducer } from '@reduxjs/toolkit';

import { changePopUp } from '../actions';

const initialState = {
  popupVisible: false,
};

const popUp = createReducer(initialState, (builder) => {
  builder
    .addCase(changePopUp, (state, action) => {
      state.popupVisible =
        action.payload === false ? false : !state.popupVisible;
    })
    .addDefaultCase(() => {});
});

export default popUp;
