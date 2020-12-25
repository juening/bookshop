import { USER_DELETE_FAIL, USER_DELETE_REMOVE_ALERT, USER_DELETE_REQUEST, USER_DELETE_SUCCESS } from "../constants/actionTypes";

const userDeleteReducer = (state={loading:false, error:null, success:false} , action) => {
    switch(action.type) {
        case USER_DELETE_REQUEST:
            return {...state, loading:true};

        case USER_DELETE_SUCCESS:
            return {...state, success:true, loading:false};

        case USER_DELETE_FAIL:
            return {...state, loading:false, success:false};

        case USER_DELETE_REMOVE_ALERT:
            return {...state, error:null};

        default:
            return state;
        
    }
};

export default userDeleteReducer;