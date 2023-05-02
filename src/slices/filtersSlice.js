import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  platform: 'all',
  category: 'mmorpg',
  sort: 'relevance',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    platformSelected: (state, action) => {
      state.platform = action.payload;
    },
    categorySelected: (state, action) => {
      state.category = action.payload;
    },
    sortBy: (state, action) => {
      state.sort = action.payload;
    },
  },
});

const { actions, reducer } = filtersSlice;

export default reducer;
export const { platformSelected, categorySelected, sortBy } = actions;
