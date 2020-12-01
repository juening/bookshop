import {BOOK_DETAILS_REQUEST, BOOK_DETAILS_SUCCESS, BOOK_DETAILS_FAIL} from '../constants/actionTypes'

const bookDetailsReducer = (state={loading:false, error:null, book:null}, action) => {
    switch(action.type) {
        case BOOK_DETAILS_REQUEST:
            return {...state, loading:true};

        case BOOK_DETAILS_SUCCESS:
            return {...state, loading:false, book:action.payload};

        case BOOK_DETAILS_FAIL:
            return {...state, loading:false, error:action.payload};

        default:
            return state;
    }
}

export default bookDetailsReducer