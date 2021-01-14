import {BOOK_LIST_REQUEST, BOOK_LIST_SUCCESS, BOOK_LIST_FAIL} from '../constants/actionTypes';

const bookListReducer = (state={books:[], loading:false, error:null}, action) => {
    switch(action.type) {
        case BOOK_LIST_REQUEST:
            return {...state, loading:true};

        case BOOK_LIST_SUCCESS:
            return {...state, loading:false, books:action.payload.books, page:action.payload.page, pages:action.payload.pages};

        case BOOK_LIST_FAIL:
            return {...state, loading:false, error:action.payload};
            
        default:
            return state;
    }
}

export default bookListReducer;