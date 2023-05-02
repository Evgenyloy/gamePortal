import { configureStore } from '@reduxjs/toolkit';

import filters from '../slices/filtersSlice';
import selectedItems from '../slices/selectedItemsSlice';
import popUp from '../slices/popupSlice';
import { apiSlice } from '../api/apiSlice';

const store = configureStore({
  reducer: {
    filters,
    selectedItems,
    popUp,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
