import { USER_UPDATE_FAIL, USER_UPDATE_REMOVE_ALERT, USER_UPDATE_REQUEST, USER_UPDATE_RESET, USER_UPDATE_SUCCESS } from '../constants/actionTypes';

const userUpdateReducer = (state={loading:false, error:null, success:false, }, action) => {
    switch(action.type) {
        case USER_UPDATE_REQUEST:
            return {...state, loading:false};
        
        case USER_UPDATE_SUCCESS:
            return {...state, loading:false, success:true,};

        case USER_UPDATE_FAIL:
            return {...state, loading:false, error:action.payload, success:false};

        case USER_UPDATE_REMOVE_ALERT:
            return {...state, error:null};

        case USER_UPDATE_RESET:
            return {...state, success:false};

        default:
            return state;
    }
}

export default userUpdateReducer;