import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Button, Row, Col } from 'react-bootstrap';
import {Link} from 'react-router-dom';

import { userRegister} from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';

const RegisterPage = ({location, history}) => {
    const [user, setUser] = useState({name:'', email:'', password:'', confirmPassword:''});
    const [message, setMessage] = useState(null);

    const register = useSelector(state => state.userRegister);
    const {error,  loading, currentUser} = register;


    const redirect = location.search? location.search.split('=')[1]:'/';

    useEffect(() => {
        if(currentUser){
            history.push(redirect)
        }
    }, [history, redirect, currentUser])

    const {name, email, password, confirmPassword} = user;
    const handleChange = e => {
        const {id, value} = e.target;
        setUser({...user, [id]:value})
    }

    const dispatch = useDispatch();

    const submitHandler = e => {
        e.preventDefault();
        if(password !== confirmPassword) {
            setMessage('Passwords do not match.')
        } else {
            const newUser = {
                name, email, password
            }
            dispatch(userRegister(newUser));            
        }
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'> {error} </Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control type='text' placeholder='Your Name' value={name} onChange={handleChange}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter your email' value={email} onChange={handleChange}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter Password' value={password} onChange={handleChange} ></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Conmfirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} onChange={handleChange} ></Form.Control>
                </Form.Group>
                
                <Button type='submit' variant='primary'>Register</Button>
            </Form>


            <Row className='py-3'>
                <Col>
                    Already have an account? <Link to={'/login'}>Log In</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterPage;
