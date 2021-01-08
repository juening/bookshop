import axios from 'axios';
import { ORDER_CREATION_FAIL, ORDER_CREATION_REMOVE_ALERT, ORDER_CREATION_REQUEST, ORDER_CREATION_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REMOVE_ALERT, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_LIST_MY_FAIL, ORDER_LIST_MY_REMOVE_ALERT, ORDER_LIST_REQUEST, ORDER_LIST_FAIL, ORDER_LIST_REMOVE_ALERT, ORDER_LIST_SUCCESS, ORDER_PAY_REMOVE_ALERT, ORDER_DELIVER_FAIL, ORDER_DELIVER_REMOVE_ALERT, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS } from "../constants/actionTypes"

export const createOrder = order => async (dispatch, getState) => {
    console.log(order)
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

export const getOrderDetails = orderId => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_DETAILS_REQUEST});

        const {userLogin:{currentUser}} = getState();

        const config = {
            headers: {
                Authorization:`Bearer ${currentUser.token}`
            }
        };        

        const {data} = await axios.get(`/api/order/${orderId}`, config) ;

        dispatch({type:ORDER_DETAILS_SUCCESS, payload:data})
    } catch (error) {
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
        //remove alert after 5s
        setTimeout(() => {
            dispatch({
                type:ORDER_DETAILS_REMOVE_ALERT
            })
        }, 5000)
    }
};

export const payOrder =( orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
        });

        const {userLogin:{currentUser}} = getState();

        const config = {
            headers: { 
                'Content-Type':'application/json',
                Authorization:`Bearer ${currentUser.token}`
            }
        };        

        const {data} = await axios.put(`/api/order/${orderId}/pay`, paymentResult, config);
        dispatch({type:ORDER_PAY_SUCCESS, payload:data});

    } catch (error) {
        dispatch({
            type:ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
        //remove alert after 5s
        setTimeout(() => {
            dispatch({
                type:ORDER_PAY_REMOVE_ALERT
            })
        }, 5000)
    }
};

export const deliverOrder = (orderId) =>async (dispatch, getState) => {
    try {
        dispatch({type:ORDER_DELIVER_REQUEST});

        const {userLogin:{currentUser}} = getState();

        const config = {
            headers:{
                Authorization: `Bearer ${currentUser.token}`
            }
        };

        const {data} = await axios.put(`/api/order/${orderId}/deliver`, {}, config);

        dispatch({
            type: ORDER_DELIVER_SUCCESS
        })
        
    } catch (error) {
        dispatch({
            type:ORDER_DELIVER_FAIL,
            payload: error.response && error.response.data.message? error.response.data.message :error.message
        });

        setTimeout(() => {
            dispatch({
                type:ORDER_DELIVER_REMOVE_ALERT
            })
        }, 5000);
    }
}

export const listMyOrders =() => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_MY_REQUEST
        });

        const {userLogin:{currentUser}} = getState();

        const config = {
            headers: { 
                Authorization:`Bearer ${currentUser.token}`
            }
        };        

        const {data} = await axios.get(`/api/order/myorders`,  config);
        dispatch({type:ORDER_LIST_MY_SUCCESS, payload:data});

    } catch (error) {
        dispatch({
            type:ORDER_LIST_MY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
        //remove alert after 5s
        setTimeout(() => {
            dispatch({
                type:ORDER_LIST_MY_REMOVE_ALERT
            })
        }, 5000)
    }
}

export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type:ORDER_LIST_REQUEST
        });

        const {userLogin:{currentUser}} = getState();        

        const config = {
            headers:{
                Authorization: `Bearer ${currentUser.token}`
            }
        };

        const {data} = await axios.get(`/api/order`, config)
        dispatch({type:ORDER_LIST_SUCCESS, payload:data})
        
    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.message? error.response.data.message : error.message
        });

        setTimeout(() => {
            dispatch({
                type: ORDER_LIST_REMOVE_ALERT
            }, 5000)
        })
    }
}