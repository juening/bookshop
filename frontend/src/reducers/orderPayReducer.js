import { ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESS } from '../constants/actionTypes';

const initialState = {error:null, success:false, loading:false};

const orderPayReducer = (state = initialState, action) => {
    switch(action.type) {
        case ORDER_PAY_REQUEST:
            return {...state, loading:true};
        
        case ORDER_PAY_SUCCESS:
            return {...state, loading:false, success:true};
        
        case ORDER_PAY_FAIL:
            return {...state, loading:false, error:action.payload};
        
        case ORDER_PAY_RESET:
            return {...initialState};

        default:
            return state;
    }
}

export default orderPayReducer;