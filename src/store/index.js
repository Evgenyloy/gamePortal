import { configureStore } from '@reduxjs/toolkit';

import filters from '../reducers/filters.js';
import selectedItems from '../reducers/selectedItems.js';
import popUp from '../reducers/popup.js';

const store = configureStore({
  reducer: { filters, selectedItems, popUp },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
