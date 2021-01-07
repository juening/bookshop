import { ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_REMOVE_ALERT } from "../constants/actionTypes"

const orderListReducer = (state={orders:[], loading:false, error:null}, action) => {
switch(action.type) {
    case ORDER_LIST_REQUEST:
        return {...state, loading:true};

    case ORDER_LIST_SUCCESS:
        return {...state, loading:false, orders:action.payload};

    case ORDER_LIST_FAIL:
        return {...state, loading:false, error:action.payload};

    case ORDER_LIST_REMOVE_ALERT:
        return {...state, error:null};

    default:
        return state;
}
}

export default orderListReducer;