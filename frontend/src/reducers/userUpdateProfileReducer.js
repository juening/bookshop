import { USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_REMOVE_ALERT } from '../constants/actionTypes';

const userUpdateProfileReducer = (state={loading:false, error:null, success:false, currentUser:null}, action) => {
    switch(action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return {...state, loading:false};
        
        case USER_UPDATE_PROFILE_SUCCESS:
            return {...state, loading:false, success:true, currentUser:action.payload};

        case USER_UPDATE_PROFILE_FAIL:
            return {...state, loading:false, error:action.payload, success:false};

        case USER_UPDATE_PROFILE_REMOVE_ALERT:
            return {...state, error:null};

        default:
            return state;
    }
}

export default userUpdateProfileReducer;