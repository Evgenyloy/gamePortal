import {
  legacy_createStore,
  combineReducers,
  compose,
  applyMiddleware,
} from 'redux';
import ReduxThunk from 'redux-thunk';
import filters from '../reducers/filters.js';
import selectedItems from '../reducers/selectedItems.js';
import popUp from '../reducers/popup.js';

const store = legacy_createStore(
  combineReducers({ filters, selectedItems, popUp }),
  compose(
    applyMiddleware(ReduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
