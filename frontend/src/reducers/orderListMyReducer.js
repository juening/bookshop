import { ORDER_LIST_MY_FAIL, ORDER_LIST_MY_REMOVE_ALERT, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS } from "../constants/actionTypes";

const orderListMyReducer = (state={orders:[], error:null, loading:false}, action) => {
    switch(action.type){
        case ORDER_LIST_MY_REQUEST:
            return {...state, loading:true};

        case ORDER_LIST_MY_SUCCESS:
            return {...state, loading:false, orders:action.payload};

        case ORDER_LIST_MY_FAIL:
            return {...state, loading:false, error:action.payload};

        case ORDER_LIST_MY_REMOVE_ALERT:
            return {...state, error:null};

        default:
            return state;
    }
}

export default orderListMyReducer;