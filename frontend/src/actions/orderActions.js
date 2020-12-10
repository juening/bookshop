import axios from 'axios';
import { ORDER_CREATION_FAIL, ORDER_CREATION_REMOVE_ALERT, ORDER_CREATION_REQUEST, ORDER_CREATION_SUCCESS } from "../constants/actionTypes"

export const createOrder = order => async (dispatch, getState) => {
    try {
        dispatch({type:ORDER_CREATION_REQUEST});

        const {userLogin:{currentUser}} = getState();

        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${currentUser.token}`
            }
        };

        const {data} = await axios.post('/api/order', order, config);
        dispatch({type:ORDER_CREATION_SUCCESS, payload:data})

    } catch(error) {
        dispatch({
            type:ORDER_CREATION_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        })

        //remove error after 5 seconds
        setTimeout(() => {
            dispatch({
                type:ORDER_CREATION_REMOVE_ALERT
            })
        }, 5000);
    }
};