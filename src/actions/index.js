/* import { createAction } from '@reduxjs/toolkit';

export const selectGame = (game, getSpecificGame) => (dispatch) => {
  dispatch(gameFetching());
  getSpecificGame(game.id)
    .then((data) => dispatch(gameFetched(data)))
    .then((data) =>
      localStorage.setItem('selectedGame', JSON.stringify(data.payload))
    )
    .catch(() => dispatch(gameFetchingError()));
};

export const platformSelected = createAction('PLATFORM_SELECTED');

export const categorySelected = createAction('CATEGORY_SELECTED');

export const sortBy = createAction('SORT_BY');

export const changePopUp = createAction('CHANGE_POPUP_VISIBLE');

export const selectNews = createAction('SELECT_NEWS');

export const gameFetching = createAction('GAME_FETCHING');

export const gameFetched = createAction('GAME_FETCHED');

export const gameFetchingError = createAction('GAME_FETCHING_ERROR');
 */
