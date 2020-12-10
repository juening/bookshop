const { ORDER_CREATION_REQUEST, ORDER_CREATION_SUCCESS, ORDER_CREATION_FAIL, ORDER_CREATION_REMOVE_ALERT } = require("../constants/actionTypes");

const orderCreationReducer = (state={loading:false, error:null, order:null, success:false}, action) => {
    switch(action.type) {

        case ORDER_CREATION_REQUEST:
            return {...state, loading:true};
        
        case ORDER_CREATION_SUCCESS:
            return {...state, loading:false, order:action.payload, success:true};

        case ORDER_CREATION_FAIL:
            return {...state, loading:false, error:action.payload, success:false};
        
        case ORDER_CREATION_REMOVE_ALERT:
            return {...state, error:null};
        
        default:
            return state;
    }
};

export default orderCreationReducer;