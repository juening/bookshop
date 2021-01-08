import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Button } from 'react-bootstrap';

import {saveShippingAddress} from '../actions/cartActions';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingPage = ({history}) => {
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;

    const [streetAddress, setStreetAddress] = useState(shippingAddress.streetAddress);
    const [city, setCity]= useState(shippingAddress.city);
    const [state, setState] = useState(shippingAddress.state);
    const [zip, setZip] = useState(shippingAddress.zip);

    const dispatch = useDispatch();
    

    const submitHandler = e => {
        e.preventDefault();
        dispatch(saveShippingAddress({streetAddress, city, state, zip}));
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping Address</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Street Address</Form.Label>
                        <Form.Control type='text' value={streetAddress} placeholder='Street Address' onChange={e =>setStreetAddress(e.target.value)} required>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                        <Form.Control type='text' value={city} placeholder='City' onChange={e =>setCity(e.target.value)} required>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='state'>
                    <Form.Label>State</Form.Label>
                     <Form.Control type='text' value={state} placeholder='State' onChange={e =>setState(e.target.value)} required>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='zip'>
                    <Form.Label>Zip Code</Form.Label>
                        <Form.Control type='text' value={zip} placeholder='Zip Code' onChange={e =>setZip(e.target.value)} required>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingPage
