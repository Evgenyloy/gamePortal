const initialState = {
  selectedNews: localStorage.getItem('news')
    ? JSON.parse(localStorage.getItem('news'))
    : {},

  selectedGame: localStorage.getItem('selectedGame')
    ? JSON.parse(localStorage.getItem('selectedGame'))
    : {},
  gameLoadingStatus: 'idle',
};

const selectedImtes = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_NEWS':
      return {
        ...state,
        selectedNews: action.payload,
      };

    case 'GAME_FETCHING':
      return {
        ...state,
        gameLoadingStatus: 'loading',
      };
    case 'GAME_FETCHED':
      return {
        ...state,
        selectedGame: action.payload,
        gameLoadingStatus: 'idle',
      };
    case 'GAME_FETCHING_ERROR':
      return {
        ...state,
        gameLoadingStatus: 'error',
      };

    default:
      return state;
  }
};

export default selectedImtes;
