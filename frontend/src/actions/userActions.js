import axios from 'axios';
import {USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REMOVE_ALERT, USER_LOGOUT} from '../constants/actionTypes';

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

        setTimeout(() => {dispatch({
            type:USER_LOGIN_REMOVE_ALERT
        })}, 5000)
    }
}
