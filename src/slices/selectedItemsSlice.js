import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedNews: localStorage.getItem('news')
    ? JSON.parse(localStorage.getItem('news'))
    : {},
  selectedGame: localStorage.getItem('selectedGame')
    ? JSON.parse(localStorage.getItem('selectedGame'))
    : {},
  gameLoadingStatus: 'idle',
};

export const fetchGame = (item, getSpecificGame) => (dispatch) => {
  dispatch(gameFetching());
  getSpecificGame(item.id)
    .then((data) => dispatch(gameFetched(data)))
    .then((data) =>
      localStorage.setItem('selectedGame', JSON.stringify(data.payload))
    )
    .catch(() => dispatch(gameFetchingError()));
};

const selectedImtesSlice = createSlice({
  name: 'selectedImtes',
  initialState,
  reducers: {
    selectNews: (state, action) => {
      state.selectedNews = action.payload;
    },
    gameFetching: (state) => {
      state.gameLoadingStatus = 'loading';
    },
    gameFetched: (state, action) => {
      state.selectedGame = action.payload;
      state.gameLoadingStatus = 'idle';
    },
    gameFetchingError: (state) => {
      state.gameLoadingStatus = 'error';
    },
  },
});

const { actions, reducer } = selectedImtesSlice;

export default reducer;
export const { selectNews, gameFetching, gameFetched, gameFetchingError } =
  actions;
