export const platformSelected = (platform) => {
  return {
    type: 'PLATFORM_SELECTED',
    payload: platform,
  };
};

export const categorySelected = (category) => {
  return {
    type: 'CATEGORY_SELECTED',
    payload: category,
  };
};

export const sortBy = (sortby) => {
  return {
    type: 'SORT_BY',
    payload: sortby,
  };
};

export const changePopUp = (arg) => {
  return {
    type: 'CHANGE_POPUP_VISIBLE',
    payload: arg,
  };
};

export const selectNews = (news) => {
  return {
    type: 'SELECT_NEWS',
    payload: news,
  };
};

export const selectGame = (game, getSpecificGame) => (dispatch) => {
  dispatch(gameFetching());
  getSpecificGame(game.id)
    .then((data) => dispatch(gameFetched(data)))
    .then((data) =>
      localStorage.setItem('selectedGame', JSON.stringify(data.payload))
    )
    .catch(() => dispatch(gameFetchingError()));
};

export const gameFetching = () => {
  return {
    type: 'GAME_FETCHING',
  };
};
export const gameFetched = (game) => {
  return {
    type: 'GAME_FETCHED',
    payload: game,
  };
};
export const gameFetchingError = () => {
  return {
    type: 'GAME_FETCHING_ERROR',
  };
};
