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
import userUpdateProfileReducer from './reducers/userUpdateProfileReducer';
import orderCreationReducer from './reducers/orderCreationReducer';
import orderDetailsReducer from './reducers/orderDetaislReducer';
import orderPayReducer from './reducers/orderPayReducer';
import orderListMyReducer from './reducers/orderListMyReducer';
import userListReducer from './reducers/userListReducer';
import userDeleteReducer from './reducers/userDeleteReducer';
import bookDeleteReducer from './reducers/bookDeleteReducer';
import bookCreateReducer from './reducers/bookCreateReducer';
import bookUpdateReducer from './reducers/bookUpdateReducer';

const rootReducer = combineReducers({
    bookList: bookListReducer,
    bookDetails: bookDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails:userDetaislReducer,
    userUpdate: userUpdateReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete:userDeleteReducer,
    orderCreate:orderCreationReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy:orderListMyReducer,
    bookDelete: bookDeleteReducer,
    bookCreate:bookCreateReducer,
    bookUpdate:bookUpdateReducer
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