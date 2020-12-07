import {CART_ADD_ITEM, CART_SET_QUANTITY, CART_CLEAR_ITEM, SAVE_SHIPPING_ADDRESS} from '../constants/actionTypes';

const cartReducer = (state = { cartItems:[], shippingAddress:{}}, action) => {
switch(action.type) {

    case CART_CLEAR_ITEM:
        return {...state, cartItems:state.cartItems.filter(item => item._id !== action.payload )};

    case CART_ADD_ITEM:
        return {...state,  cartItems: addItemToCart(state.cartItems, action.payload)};

    case CART_SET_QUANTITY:
        return {...state, cartItems:state.cartItems.map(item => item._id === action.payload._id? {...item, qty:action.payload.qty}:item)};

    case SAVE_SHIPPING_ADDRESS:
        return {...state, shippingAddress:action.payload};

    default:
        return state;
    }
}

//should move the following 2 functions to a utils file
const addItemToCart = (cartItems, itemToAdd) => {
    const existingItem = cartItems.find(item => item._id === itemToAdd._id);

    if(existingItem) {
        if(existingItem.qty + itemToAdd.qty > existingItem.countInStock) {
            //if(qty in cart is more than countInStock, the maximum qty should be countInStock)
            return cartItems.map(item => item._id === itemToAdd._id? {...item, qty:item.countInStock}:item)
        } else {
            return cartItems.map(item => item._id === itemToAdd._id ? {...item, qty:item.qty + itemToAdd.qty}:item)
        }
    }

    return [...cartItems, itemToAdd];
}

// const removeItemFromCart = (cartItems, itemToRemove) => {
//     const existingItem = cartItems.find(item => item._id === itemToRemove._id);
    
//     if(existingItem.qty - itemToRemove.qty <=0) {
//         return cartItems.filter(item => item._id !== itemToRemove._id);
//     }

//     return cartItems.map(item => item._id === itemToRemove._id ? {...item, qty: item.qty - itemToRemove.qty}:item)
// }

export default cartReducer;