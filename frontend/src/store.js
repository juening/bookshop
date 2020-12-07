import {createStore, combineReducers,  applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'; 
import bookListReducer from './reducers/bookListReducer';
import bookDetailsReducer from './reducers/bookDetailsReducer';
import cartReducer from './reducers/cartReducer';
import userLoginReducer from './reducers/userLoginReducer';
import userRegisterReducer from './reducers/userRegisterReducer';
import userDetaislReducer from './reducers/userDetailsReducer';
import userUpdateReducer from './reducers/userUpdateReducer';

const rootReducer = combineReducers({
    bookList: bookListReducer,
    bookDetails: bookDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails:userDetaislReducer,
    userUpdate: userUpdateReducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')):[];
const currentUserFromStorage = localStorage.getItem('currentUser')? JSON.parse(localStorage.getItem('currentUser')):null;
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')): {};

const initialState = {
    cart:{cartItems:cartItemsFromStorage, shippingAddress:shippingAddressFromStorage},
    userLogin:{currentUser: currentUserFromStorage}
};

const middleware = [thunk];

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;