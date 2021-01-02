import axios from 'axios';

import {BOOK_LIST_REQUEST, BOOK_LIST_SUCCESS, BOOK_LIST_FAIL, BOOK_DETAILS_REQUEST, BOOK_DETAILS_SUCCESS, BOOK_DETAILS_FAIL} from '../constants/actionTypes';

export const fetchBooks = () => async (dispatch) => {
    try {
        dispatch({type:BOOK_LIST_REQUEST});

        const {data} = await axios.get('/api/books');

        dispatch({type:BOOK_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({
            type:BOOK_LIST_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message:error.message
        })
    }
};

export const fetchBook = (bookId) => async dispatch => {
    try {
        dispatch({type:BOOK_DETAILS_REQUEST});

        const {data} = await axios.get(`/api/books/${bookId}`);

        dispatch({type:BOOK_DETAILS_SUCCESS, payload:data});
    } catch (error) {
        dispatch({
            type:BOOK_DETAILS_FAIL,
            payload:error.message && error.response.data.message? error.response.data.message : error.message
        })
    }
}  

export const deleteBook = bookId => async (dispatch, getState) => {

}

export const createBook = () => async (dispatch, getState) => {

}