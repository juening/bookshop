import axios from 'axios';
import {CART_ADD_ITEM, CART_CLEAR_ITEM ,CART_SET_QUANTITY, SAVE_PAYMENT_METHOD, SAVE_SHIPPING_ADDRESS} from '../constants/actionTypes';


export const clearItem = (itemId) => (dispatch, getState) => {

    dispatch({ 
        type:CART_CLEAR_ITEM,
        payload:itemId
    });

    localStorage.setItem('cartItems',  JSON.stringify(getState().cart.cartItems))
};

export const addItem = (id, qty) => async (dispatch,getState) =>{
    const {data} = await axios.get(`/api/books/${id}`);

    dispatch({
        type:CART_ADD_ITEM,
        payload: {
            name:data.name,
            countInStock:data.countInStock,
            image:data.image,
            _id:data._id,
            price:data.price,
            qty
        }
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export  const setCartQuantity = (id, qty) => async (dispatch,getState)  =>{
    dispatch({
        type:CART_SET_QUANTITY,
        payload:{
            _id:id,
            qty
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
};


export const saveShippingAddress=(address) => dispatch => {
    dispatch({
        type:SAVE_SHIPPING_ADDRESS,
        payload:address
    });

    localStorage.setItem('shippingAddress', JSON.stringify(address));
};;

export const savePayment = payment => dispatch => {
    dispatch({
        type: SAVE_PAYMENT_METHOD,
        payload: payment
    });

    localStorage.setItem('payment', JSON.stringify(payment))
};