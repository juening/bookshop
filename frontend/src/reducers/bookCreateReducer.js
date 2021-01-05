import { BOOK_CREATE_FAIL, BOOK_CREATE_REMOVE_ALERT, BOOK_CREATE_REQUEST, BOOK_CREATE_RESET, BOOK_CREATE_SUCCESS } from "../constants/actionTypes";

const bookCreateReducer = (state={loading:false, createdBook:null, error:null}, action) => {
    switch(action.type) {
        case BOOK_CREATE_REQUEST:
            return {...state, loading:true};

        case BOOK_CREATE_SUCCESS:
            return {...state, loading:false, createdBook:action.payload};

        case BOOK_CREATE_FAIL:
            return {...state, loading:false, error:action.payload};

        case BOOK_CREATE_REMOVE_ALERT:
            return {...state, error:null};

        case BOOK_CREATE_RESET:
            return {loading:false, createdBook:null, error:null}

        default:
            return state;
    }
}

export default bookCreateReducer;