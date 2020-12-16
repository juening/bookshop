import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {PayPalButton} from 'react-paypal-button-v2';
import {Row, Col, ListGroup, Image, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import Message from '../components/Message';
import Loader from '../components/Loader';

import {getOrderDetails, payOrder} from '../actions/orderActions';
import {ORDER_PAY_RESET} from '../constants/actionTypes'; 

const OrderDetailsPage = ({match}) => {
    const [sdkReady, setSdkReady] = useState(false);

    const orderId =match.params.id;

    const dispatch = useDispatch();
   
    const orderDetails = useSelector(state => state.orderDetails);
    const {loading, order, error} = orderDetails;
    
    const orderPay = useSelector(state => state.orderPay);
    const {loading:loadingPay, success:successPay} = orderPay;



    useEffect( () => {
 
        const addPaypalScript = async ()=> {
            const {data: clientId} = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript'
            script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script);
        }

       
        if(!order || order._id !== orderId || successPay){
            dispatch({type:ORDER_PAY_RESET});
            dispatch(getOrderDetails(orderId));
        } else if (!order.isPaid) {
            if(!window.paypal) {
                addPaypalScript();
            } else {
                setSdkReady(true)
            }
        }

    }, [dispatch, getOrderDetails, order, orderId, successPay]);

    const successPaymentHandler =(paymentResult)=> {
        console.log(paymentResult);
        console.log(sdkReady)

        dispatch(payOrder(orderId, paymentResult));
    }

    return (
        loading? <Loader /> : error ?  <Message variant='danger'>{error}</Message> : order? (<Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Shipping To</h2>
                    <p><strong>{order.user.name}</strong></p>
                    <p>
                       <strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></strong>
                    </p>
                    <p>
                        <strong>Address: </strong>                                
                    </p>
                    <p>{order.shippingAddress.streetAddress}, </p> <p>{order.shippingAddress.city}, {order.shippingAddress.state}, </p> <p>{order.shippingAddress.zip}</p>

                    {order.isDelivered? <Message variant='success'>Delivered on {order.deliveredAt}.</Message> : <Message variant='danger'>Not Delivered.</Message>}
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Payment</h2>
                    <p><strong>Method: {order.paymentMethod} </strong></p>
                    {order.isPaid? <Message variant='success'>Paid on {order.paidAt}</Message> : <Message variant='danger'>Not Paid </Message>}
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Books in Order</h2>
                    {order.orderItems.length ===0 ? <Message >Your order is empty.</Message>: (
                        <ListGroup variant='flush'>
                            {order.orderItems.map((item, i) => (
                                <ListGroup.Item key={i}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={4}>
                                            <Link to={`/book/${item._id}`}>
                                                {item.name}
                                            </Link>
                                        </Col>
                                        <Col md={4}>
                                            {item.qty} X {item.price} = ${item.qty * item.price}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ) ) }
                        </ListGroup>
                    ) }
                    
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                Items
                            </Col>
                            <Col>
                                 ${order.subtotalPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                Shipping
                            </Col>
                            <Col>
                                 $ {order.shippingPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                Tax
                            </Col>
                            <Col>
                                 $ {order.taxPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                Total
                            </Col>
                            <Col>
                                 $ {order.totalPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    {!order.isPaid && (
                        <ListGroup.Item>
                            {loadingPay && <Loader />}
                            {!sdkReady? <Loader /> : <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} /> }
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Card>

        </Col>
    </Row>  ) :null

    )
}

export default OrderDetailsPage;
