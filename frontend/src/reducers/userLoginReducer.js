import {USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_LOGIN_REMOVE_ALERT} from '../constants/actionTypes'

const userLoginReducer = (state={loading:false, currentUser:null, error:null}, action) => {
    switch(action.type) {
        case USER_LOGIN_REQUEST:
            return {...state,loading:true, error:null};

        case USER_LOGIN_SUCCESS:
            return {...state, loading:false, currentUser:action.payload, error:null};

        case USER_LOGIN_FAIL:
            return {...state, loading:false, currentUser:null, error:action.payload};

        case USER_LOGOUT:
            return {...state, loading:false, currentUser:null, error:null};

        case USER_LOGIN_REMOVE_ALERT:
            return {...state, error:null};

        default:
            return state;
    }
}

export default userLoginReducer