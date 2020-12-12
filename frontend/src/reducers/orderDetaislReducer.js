import  { ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS,  ORDER_DETAILS_REMOVE_ALERT, ORDER_DETAILS_FAIL, } from "../constants/actionTypes";

const orderDetailsReducer = (state ={order:null, shippingAddress:{}, loading:true, error:null}, action) => {
    switch(action.type) {
        case ORDER_DETAILS_REQUEST:
            return {...state, loading:true};
    
        case ORDER_DETAILS_SUCCESS:
            return {...state, loading:false, order:action.payload};

        case ORDER_DETAILS_FAIL:
            return {...state, loading:false, error:action.payload};

        case ORDER_DETAILS_REMOVE_ALERT:
            return {...state, error:null};
            
        default:
            return state;
    }
}

export default orderDetailsReducer;