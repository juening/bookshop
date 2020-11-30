import {createStore, combineReducers,  applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'; 
import bookListReducer from './reducers/bookReducer'

const rootReducer = combineReducers({
    bookList: bookListReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;