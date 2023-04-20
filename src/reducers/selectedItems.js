import { createReducer } from '@reduxjs/toolkit';
import {
  selectNews,
  gameFetching,
  gameFetched,
  gameFetchingError,
} from '../actions';

const initialState = {
  selectedNews: localStorage.getItem('news')
    ? JSON.parse(localStorage.getItem('news'))
    : {},

  selectedGame: localStorage.getItem('selectedGame')
    ? JSON.parse(localStorage.getItem('selectedGame'))
    : {},
  gameLoadingStatus: 'idle',
};

const selectedImtes = createReducer(initialState, (builder) => {
  builder
    .addCase(selectNews, (state, action) => {
      state.selectedNews = action.payload;
    })
    .addCase(gameFetching, (state) => {
      state.gameLoadingStatus = 'loading';
    })
    .addCase(gameFetched, (state, action) => {
      state.selectedGame = action.payload;
      state.gameLoadingStatus = 'idle';
    })
    .addCase(gameFetchingError, (state) => {
      state.gameLoadingStatus = 'error';
    })
    .addDefaultCase(() => {});
});

export default selectedImtes;
