import axios from 'axios';

import {BOOK_LIST_REQUEST, BOOK_LIST_SUCCESS, BOOK_LIST_FAIL, BOOK_DETAILS_REQUEST, BOOK_DETAILS_SUCCESS, BOOK_DETAILS_FAIL, BOOK_DELETE_REQUEST, BOOK_DELETE_SUCCESS, BOOK_DELETE_FAIL, BOOK_DELETE_REMOVE_ALERT, BOOK_CREATE_SUCCESS, BOOK_CREATE_REQUEST, BOOK_CREATE_FAIL, BOOK_CREATE_REMOVE_ALERT, BOOK_UPDATE_RESET, BOOK_UPDATE_REMOVE_ALERT, BOOK_UPDATE_REQUEST, BOOK_UPDATE_FAIL, BOOK_UPDATE_SUCCESS} from '../constants/actionTypes';

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
    try {
        dispatch({
            type:BOOK_DELETE_REQUEST
        });

        const {userLogin:{currentUser}} = getState();

        const config = {
            headers:{
                Authorization: `Bearer ${currentUser.token}`
            }
        };

        await axios.delete(`/api/books/${bookId}`, config);

        dispatch({type:BOOK_DELETE_SUCCESS});

    } catch (error) {
        dispatch({
            type:BOOK_DELETE_FAIL,
            payload: error.message && error.response.data.message ? error.response.data.message :error.message
        });
        
         setTimeout(()=> {
             dispatch({type:BOOK_DELETE_REMOVE_ALERT})
         }, 5000 )
    }
}

export const createBook = () => async (dispatch, getState) => {
    try {
        dispatch({
            type:BOOK_CREATE_REQUEST
        });

        const {userLogin:{currentUser}} = getState();

        const config = {
            headers:{
                Authorization: `Bearer ${currentUser.token}`
            }
        };

        const {data} = await axios.post('/api/books', {}, config);

        dispatch({
            type:BOOK_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:BOOK_CREATE_FAIL,
            payload:error.message && error.response.data.message ? error.response.data.message : error.message
        });

        setTimeout(() => {
            dispatch({
                type:BOOK_CREATE_REMOVE_ALERT
            })
        }, 5000)
    }
}

export const updateBook = bookToUpdate => async (dispatch, getState) => {
    try {
        dispatch({type:BOOK_UPDATE_REQUEST});
        const {userLogin:{currentUser}} = getState();

        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${currentUser.token}`
            }
        };

        const {data} = await axios.put(`/api/books/${bookToUpdate._id}`, bookToUpdate, config);

        dispatch({
            type:BOOK_UPDATE_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:BOOK_UPDATE_FAIL,
            payload:error.message && error.response.data.message ? error.response.data.message : error.message
        });

        setTimeout(() => {
            dispatch({
                type:BOOK_UPDATE_REMOVE_ALERT
            })
        }, 5000)
    }
}
