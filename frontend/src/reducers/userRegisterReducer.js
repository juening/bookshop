import {USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REMOVE_ALERT} from '../constants/actionTypes';

const userRegisterReducer = (state={loading:false, error:null, currentUser:null}, action) => {
    switch(action.type) {
        case USER_REGISTER_REQUEST:
            return {...state, loading:true};
        
        case USER_REGISTER_SUCCESS:
            return {...state, loading:false, error:null, currentUser:action.payload};
        
        case USER_REGISTER_FAIL:
            return {...state, loading:false, error:action.payload};

        case USER_REGISTER_REMOVE_ALERT:
            return {...state, error:null};

        default:
            return state;
    }
}

export default userRegisterReducer;