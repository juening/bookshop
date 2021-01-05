import { BOOK_UPDATE_FAIL, BOOK_UPDATE_REMOVE_ALERT, BOOK_UPDATE_REQUEST, BOOK_UPDATE_RESET, BOOK_UPDATE_SUCCESS } from "../constants/actionTypes";
import bookDeleteReducer from "./bookDeleteReducer"

const bookUpdateReducer = (state={loading:false, success:false, error:null }, action) => {
    switch(action.type) {
        case BOOK_UPDATE_REQUEST:
            return {...state, loading:true};

        case BOOK_UPDATE_SUCCESS:
            return {...state, loading:false, success:true};

        case BOOK_UPDATE_FAIL:
            return {...state, loading: false, error:action.payload};

        case BOOK_UPDATE_REMOVE_ALERT:
            return {...state, error:null};

        case BOOK_UPDATE_RESET:
            return {loading:false, book:{}, error:null};

        default:
            return state;
    }

}

export default bookUpdateReducer;