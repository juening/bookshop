import { BOOK_DELETE_FAIL, BOOK_DELETE_REMOVE_ALERT, BOOK_DELETE_REQUEST, BOOK_DELETE_SUCCESS } from "../constants/actionTypes";

const bookDeleteReducer = (state ={loading:false, success:false, error:null}, action) => {
    switch(action.type) {
        case BOOK_DELETE_REQUEST:
            return {...state, loading:true};

        case BOOK_DELETE_SUCCESS:
            return {...state, loading:false, success:true};

        case BOOK_DELETE_FAIL:
            return {...state, loading:false, error:action.payload};

        case BOOK_DELETE_REMOVE_ALERT:
            return {...state, error:null};

        default:
            return state;
    }
}

export default bookDeleteReducer;