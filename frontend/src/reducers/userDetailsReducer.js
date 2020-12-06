import { USER_DETAILS_FAIL, USER_DETAILS_REMOVE_ALERT, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS } from '../constants/actionTypes';

const userDetaislReducer = (state={loading:false, error:null, userInfo:null}, action) => {
    switch(action.type) {
        case USER_DETAILS_REQUEST:
            return {...state, loading:true};

        case USER_DETAILS_SUCCESS:
            return {...state, loading:false, userInfo:action.payload};
        
        case USER_DETAILS_FAIL:
            return {...state, loading:false, error:action.payload};

        case USER_DETAILS_REMOVE_ALERT:
            return {...state, error:null};
        
        default:
            return state;
    }
}

export default userDetaislReducer;