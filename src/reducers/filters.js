import { createReducer } from '@reduxjs/toolkit';
import { platformSelected, categorySelected, sortBy } from '../actions';

const initialState = {
  platform: 'all',
  category: 'mmorpg',
  sort: 'relevance',
};

const filters = createReducer(initialState, (builder) => {
  builder
    .addCase(platformSelected, (state, action) => {
      state.platform = action.payload;
    })
    .addCase(categorySelected, (state, action) => {
      state.category = action.payload;
    })
    .addCase(sortBy, (state, action) => {
      state.sort = action.payload;
    })
    .addDefaultCase(() => {});
});

export default filters;
