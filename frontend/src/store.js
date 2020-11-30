import {createStore, combineReducers,  applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'; 
import bookListReducer from './reducers/bookListReducer';
import bookDetailsReducer from './reducers/bookDetailsReducer';

const rootReducer = combineReducers({
    bookList: bookListReducer,
    bookDetails: bookDetailsReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;