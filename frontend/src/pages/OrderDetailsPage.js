import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Row, Col, ListGroup, Image, Card, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import Message from '../components/Message';
import Loader from '../components/Loader';

import {getOrderDetails} from '../actions/orderActions';

const OrderDetailsPage = ({match}) => {

    const dispatch = useDispatch();
   
    const orderDetails = useSelector(state => state.orderDetails);
    const {loading, order, error} = orderDetails;
    

    useEffect( () => {
        dispatch(getOrderDetails(match.params.id))
    }
     
        , [dispatch, getOrderDetails])

    return (
        loading? <Loader /> : error ?  <Message variant='danger'>{error}</Message> : order? (<Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Shipping To</h2>
                    <p>
                        <strong>Address: </strong>                                
                    </p>
                    <p>{order.shippingAddress.streetAddress}, </p> <p>{order.shippingAddress.city}, {order.shippingAddress.state}, </p> <p>{order.shippingAddress.zip}</p>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Payment</h2>
                    <p><strong>Method:</strong></p>
                    <p> {order.paymentMethod} </p>
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

                </ListGroup>
            </Card>

        </Col>
    </Row>  ) :null

    )
}

export default OrderDetailsPage;
