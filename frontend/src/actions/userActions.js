import axios from 'axios';

import {USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REMOVE_ALERT, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REMOVE_ALERT, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REMOVE_ALERT, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_REMOVE_ALERT, USER_DETAILS_RESET, ORDER_LIST_MY_RESET, USER_LIST_FAIL, USER_LIST_RESET, USER_LIST_REQUEST, USER_LIST_SUCCESS} from '../constants/actionTypes';


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


export const logOut = () =>dispatch => {
    localStorage.removeItem('currentUser')
    dispatch({type:USER_LOGOUT});
    dispatch({type:USER_DETAILS_RESET});
    dispatch({type: ORDER_LIST_MY_RESET});
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
};


export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: USER_DETAILS_REQUEST});

        const {userLogin} = getState();
        const {currentUser} = userLogin;

        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${currentUser.token}`
            }
        };

        const {data} = await axios.get(`/api/user/${id}`, config);
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload:data
        });

    } catch (error) {
        dispatch({
            type:USER_DETAILS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        })

        //remove error after 5 seconds
        setTimeout(() => {
            dispatch({
                type:USER_DETAILS_REMOVE_ALERT
            })
        }, 5000);
    }
}

export const updateUserProfile = user => async (dispatch, getState) => {
    try {
        dispatch({type:USER_UPDATE_PROFILE_REQUEST});

        const {userLogin:{currentUser}} = getState();

        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${currentUser.token}`
            }
        };

        const {data} = await axios.put('/api/user/profile', user, config);
        
        dispatch({
            type:USER_UPDATE_PROFILE_SUCCESS,
            payload:data
        });

        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        });
        
        localStorage.setItem('currentUser', JSON.stringify(data));

    } catch (error) {
        dispatch({
            type:USER_UPDATE_PROFILE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        })

        //remove error after 5 seconds
        setTimeout(() => {
            dispatch({
                type:USER_UPDATE_REMOVE_ALERT
            })
        }, 5000);
    }
};

export const listUsers =() => async (dispatch, getState) =>{
    try {
        dispatch({type:USER_LIST_REQUEST});
        const {userLogin:{currentUser}}= getState();

        const config = {
            headers:{
                Authorization: `Bear ${currentUser.token}`
            }
        };

        const {data } = await axios.get('/api/user/users', config);

        dispatch({
            type: USER_LIST_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:USER_LIST_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        })

        //remove error after 5 seconds
        setTimeout(() => {
            dispatch({
                type:USER_LIST_RESET
            })
        }, 5000);
    }
}

export const deleteUser = () => async (dispatch, getState) => {

}