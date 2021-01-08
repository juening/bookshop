import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Button, Col } from 'react-bootstrap';

import {savePayment} from '../actions/cartActions';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingPage = ({history}) => {
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;

    const [paymentMethod, setPaymentMethod] = useState('Paypal');

    const dispatch = useDispatch();
    
    const submitHandler = e => {
        e.preventDefault();
        dispatch(savePayment(paymentMethod));
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>
                        Select Payment Method
                    </Form.Label>
       
                    <Col>
                        <Form.Check type='radio' label='Paypal or Credit Card'
                        id='Paypal'
                        name='paymentMethod'
                        value='Paypal'
                        checked
                        onChange = {e => setPaymentMethod(e.target.value)} >
                        </Form.Check>

                        <Form.Check type='radio' label='Stripe'
                        id='Stripe'
                        name='paymentMethod'
                        value='Stripe'
                        onChange = {e => setPaymentMethod(e.target.value)}
                        >
                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    )
};

export default ShippingPage
