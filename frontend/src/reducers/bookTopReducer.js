import { BOOK_TOP_FAIL, BOOK_TOP_SUCCESS , BOOK_TOP_REQUEST} from "../constants/actionTypes";

const bookTopReducer =(state={loading:false, books:[], error:null}, action) => {
    switch (action.type) {
        case BOOK_TOP_REQUEST:
            return {...state, loading:true};

        case BOOK_TOP_SUCCESS:
            return {...state, loading:false,  books:action.payload};
            
        case BOOK_TOP_FAIL:
            return {...state, error:action.payload, loading:false };

        default:
            return state;
    }
}

export default bookTopReducer;