import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Button, Row, Col, Table } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { getUserDetails, updateUserProfile} from '../actions/userActions';
import {listMyOrders} from '../actions/orderActions';
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

    const userUpdateProfile = useSelector(state=>state.userUpdateProfile);
    const {success} = userUpdateProfile;

    const orderListMy = useSelector(state=>state.orderListMy);
    const {loading:loadingMyList, error:errorMyList, orders} = orderListMy;

    useEffect(() => {
        if(!currentUser){
            history.push('/')
        } else {
            if( !userInfo) {
                dispatch(getUserDetails('profile'));
                dispatch(listMyOrders());
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
                <h2>My Orders</h2>
                {loadingMyList? <Loader />: errorMyList? <Message variant='danger'>{errorMyList}</Message> : (
                    <Table striped hover responsive bordered className='table-sm'>
                        <thead>
                            <tr>                            
                                <td>ID</td>
                                <td>DATE</td>
                                <td>TOTAL</td>
                                <td>PAID</td>
                                <td>DELIVERED</td>
                                <td></td>
                            </tr>

                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid? order.paidAt.substring(0,10): (<i className='fas fa-times' style={{color:"red"}}></i>)}</td>
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : (<i className='fas fa-times' style={{color:"red"}}></i>)}</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button variant='lignt'>Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>

        </Row>
    )
}

export default ProfilePage;
