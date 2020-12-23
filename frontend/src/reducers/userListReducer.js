import { USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_RESET, USER_LIST_SUCCESS } from "../constants/actionTypes";

const userListReducer = (state= {loading:false, users:[], error:null}, action) => {
    switch(action.type) {
        case USER_LIST_REQUEST:
            return {...state, loading:true};

        case USER_LIST_SUCCESS:
            return {...state, loading:false, users:action.payload};

        case USER_LIST_FAIL:
            return {...state, loading:false, error:action.payload};

        case USER_LIST_RESET:
            return {...state, error:null};

        default:
            return state;
    }
}

export default userListReducer;