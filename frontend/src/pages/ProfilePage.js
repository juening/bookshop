import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Button, Row, Col } from 'react-bootstrap';

import { getUserDetails, updateUserProfile} from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const ProfilePage = ({location, history}) => {
    const [user, setUser] = useState({name:'', email:'', password:'', confirmPassword:''});
    const {name, email, password, confirmPassword} = user;

    const [message, setMessage] = useState(null);
    
    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const {error,  loading, userInfo} = userDetails;

    const userLogin = useSelector(state=> state.userLogin);
    const {currentUser} = userLogin;

    const userUpdate = useSelector(state=>state.userUpdate);
    const {success} = userUpdate;


    useEffect(() => {
        if(!currentUser){
            history.push('/')
        } else {
            if( !userInfo) {
                dispatch(getUserDetails('profile'));
            } else {
                setUser({name:userInfo.name, email:userInfo.email})
            }
        }
    }, [history,  currentUser, dispatch, userInfo])

    const handleChange = e => {
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const submitHandler = e => {
        e.preventDefault();
        if(password !== confirmPassword) {
            setMessage('Passwords do not match.')
        } else {
            dispatch(updateUserProfile({name, email, password}))
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'> {error} </Message>}
                {success && <Message variant='success'>Profile Updated</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control type='text' name="name" placeholder='Your Name' value={name} onChange={handleChange}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' name="email" placeholder='Enter your email' value={email} onChange={handleChange}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' name="password" placeholder='Enter Password' value={password} onChange={handleChange} ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Conmfirm Password</Form.Label>
                        <Form.Control type='password' name="confirmPassword" placeholder='Confirm Password' value={confirmPassword} onChange={handleChange} ></Form.Control>
                    </Form.Group>
                    
                    <Button type='submit' variant='primary'>Update</Button>
                </Form>
            </Col>
            <Col md={9}>
                My Orders
            </Col>

        </Row>
    )
}

export default ProfilePage;
