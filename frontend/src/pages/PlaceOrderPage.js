import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Row, Col, ListGroup, Image, Card, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';

import {createOrder} from '../actions/orderActions';

const PlaceOrderPage = ({history}) => {
    const cart = useSelector(state => state.cart);
    const {shippingAddress, paymentMethod, cartItems} = cart;
    const {streetAddress, city, state, zip} = shippingAddress;

    const addDecimals = num => (Math.round(num * 100) /100).toFixed(2)

    cart.subtotalPrice = (cart.cartItems.reduce((acc, item) => acc + item.price * item.qty , 0)).toFixed(2);
    cart.shippingPrice =cart.subtotalPrice >= 49 ? 0 : 6;
    cart.taxPrice =(0.0625 * cart.subtotalPrice ).toFixed(2);

    cart.totalPrice = addDecimals(Number(cart.subtotalPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice));

    const dispatch = useDispatch();

    const placeOrderHandler = e => {
        const { subtotalPrice, totalPrice, taxPrice, shippingPrice} = cart;
        dispatch(createOrder({
            orderItems:cartItems,
            shippingAddress,
            subtotalPrice,
            totalPrice,
            taxPrice,
            shippingPrice,
            paymentMethod
        }))
    }

    const orderCreate = useSelector(state => state.orderCreate);
    const {success, order, error} = orderCreate;

    useEffect(() => {
        if(success) {
            history.push(`/order/${order._id}`)
        }
    }, [history, success, order])

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping To</h2>
                            <p>
                                <strong>Address: </strong>                                
                            </p>
                            <p>{streetAddress}, </p> <p>{city}, {state}, </p> <p>{zip}</p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment</h2>
                            <p><strong>Method:</strong></p>
                            <p> {paymentMethod} </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Books in Cart</h2>
                            {cartItems.length ===0 ? <Message >Your cart is empty.</Message>: (
                                <ListGroup variant='flush'>
                                    {cartItems.map((item, i) => (
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
                                         ${cart.subtotalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Shipping
                                    </Col>
                                    <Col>
                                         $ {cart.shippingPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Tax
                                    </Col>
                                    <Col>
                                         $ {cart.taxPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Total
                                    </Col>
                                    <Col>
                                         $ {cart.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='button' className='btn-block' disabled={cartItems.length ===0} onClick={placeOrderHandler}>Place Order</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>

                </Col>
            </Row>  
        </>
    )
}

export default PlaceOrderPage;
