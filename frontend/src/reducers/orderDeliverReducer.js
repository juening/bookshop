import { ORDER_DELIVER_FAIL, ORDER_DELIVER_REQUEST, ORDER_DELIVER_RESET, ORDER_DELIVER_SUCCESS, ORDER_DELIVER_REMOVE_ALERT } from "../constants/actionTypes";

const orderDeliverReducer = (state ={loading:false, success:false, error:null}, action) => {
    switch(action.type) {
        case ORDER_DELIVER_REQUEST:
            return {...state, loading:true};

        case ORDER_DELIVER_SUCCESS:
            return {...state, loading:false, success:true};

        case ORDER_DELIVER_FAIL:
            return {...state, loading:false, error:action.payload};

        case ORDER_DELIVER_RESET:
            return {loading:false, success:false, error:null};

        case ORDER_DELIVER_REMOVE_ALERT:
            return {...state, error:null};

        default:
            return state;
    }
}

export default orderDeliverReducer;

