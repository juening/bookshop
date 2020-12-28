import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';

import { updateUser, getUserDetails} from '../actions/userActions';
import {USER_UPDATE_RESET} from '../constants/actionTypes'; 
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';

const UserEditPage = ({match, history}) => {
    const userId = match.params.id;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, userInfo} = userDetails;

    const userUpdate = useSelector(state => state.userUpdate);
    const {loading:updateLoading, success:updateSuccess, error:updateError} = userUpdate;

    const dispatch = useDispatch();

    useEffect(() => {
        if(updateSuccess) {
            dispatch({type:USER_UPDATE_RESET})
            history.push('/admin/users')
        } else {
            if(!userInfo || userInfo._id !== userId) {
                dispatch(getUserDetails(userId));
            } else {
                setName(userInfo.name);
                setEmail(userInfo.email);
                setIsAdmin(userInfo.isAdmin);
            }
        }

    }, [userId,dispatch, userInfo, history , updateSuccess])

    const submitHandler = e => {
        e.preventDefault();
        dispatch(updateUser({
            _id:userId,
            name, email, isAdmin
        }))
    }

    return (
        <>
            <Link to='/admin/users' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Update User Information</h1>
                {updateLoading && <Loader />}
                {updateError && <Message variant='danger'>{updateError}</Message>}
                {loading? <Loader /> : error ? <Message variant='danger'>{error}</Message> :(
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Your Name</Form.Label>
                            <Form.Control type='text' placeholder='Your Name' value={name} onChange={e=> setName(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type='email' placeholder='Enter your email' value={email} onChange={e=>setEmail(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='isadmin'>
                            <Form.Label>Is Admin</Form.Label>
                            <Form.Check type='checkbox' checked={isAdmin} onChange={e=>setIsAdmin(e.target.checked)}>
                            </Form.Check>
                        </Form.Group>                      
                        <Button type='submit' variant='primary'>Update</Button>
                    </Form>
                )}

            </FormContainer>
        </>

    )
}

export default UserEditPage;
