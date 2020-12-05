import axios from 'axios';

import {USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REMOVE_ALERT, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REMOVE_ALERT} from '../constants/actionTypes';

export const userLogin = (email, password) => async dispatch => {
    try {
       dispatch({
            type:USER_LOGIN_REQUEST
        });

        const config = {
            headers: {
                'Content-Type':"application/json"
            }
        };

        const {data} = await axios.post('/api/user/login', {email, password}, config);

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload:data
        });

        localStorage.setItem('currentUser', JSON.stringify(data))

    } catch(err) {
        dispatch({
            type:USER_LOGIN_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        });
        //remove error message after 5 seconds
        setTimeout(() => {dispatch({
            type:USER_LOGIN_REMOVE_ALERT
        })}, 5000)
    }
};

export const logOut = () => {
    localStorage.removeItem('currentUser')
    return {type:USER_LOGOUT};
}


export const userRegister = ({name, email, password} ) => async dispatch => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        });

        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        };

        const {data} =await axios.post('/api/user', {email, password, name}, config);
        
        dispatch({type: USER_REGISTER_SUCCESS, payload:data});
        dispatch({type:USER_LOGIN_SUCCESS, payload:data});//login in user after registration

        localStorage.setItem('currentUser', JSON.stringify(data));
    } catch(err) {
        dispatch({
            type:USER_REGISTER_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        });

        //remove error message after 5 seconds
        setTimeout(() => {dispatch({
            type:USER_REGISTER_REMOVE_ALERT
        })}, 5000)
    }
}