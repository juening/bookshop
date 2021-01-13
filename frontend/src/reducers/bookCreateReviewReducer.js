import { BOOK_CREATE_REMOVE_ALERT, BOOK_CREATE_REVIEW_FAIL, BOOK_CREATE_REVIEW_REQUEST, BOOK_CREATE_REVIEW_RESET, BOOK_CREATE_REVIEW_SUCCESS } from "../constants/actionTypes";

const bookCreateReviewReducer = (state={success:false, loading:false, error:null}, action) => {
    switch (action.type) {
        case BOOK_CREATE_REVIEW_REQUEST:
            return {...state, loading:true};

        case BOOK_CREATE_REVIEW_SUCCESS:
            return {...state, loading:false, success:true};
        
        case BOOK_CREATE_REVIEW_FAIL:
            return {...state, loading:false, error:action.payload};

        case BOOK_CREATE_REMOVE_ALERT:
            return {...state, error:null};

        case BOOK_CREATE_REVIEW_RESET:
            return {success:false, loading:false, error:null};

        default:
            return state;

    }
}

export default bookCreateReviewReducer;