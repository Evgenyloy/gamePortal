const initialState = {
  platform: 'all',
  category: 'mmorpg',
  sort: 'relevance',
};

const filters = (state = initialState, action) => {
  switch (action.type) {
    case 'PLATFORM_SELECTED':
      return {
        ...state,
        platform: action.payload,
      };
    case 'CATEGORY_SELECTED':
      return {
        ...state,
        category: action.payload,
      };
    case 'SORT_BY':
      return {
        ...state,
        sort: action.payload,
      };

    default:
      return state;
  }
};

export default filters;
