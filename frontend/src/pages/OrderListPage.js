import React , {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Table, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';

import {listOrders} from '../actions/orderActions'

const OrderListPage = ({history}) => {
    const dispatch = useDispatch();

    const orderList = useSelector(state => state.orderList);
    const {orders, error, loading} = orderList;

    const userLogin = useSelector(state => state.userLogin);
    const {currentUser} = userLogin;

    useEffect(() => {

        if(currentUser && currentUser.isAdmin) {
            dispatch(listOrders());
        } else {
            history.push('/login')
        }
    }, [dispatch, history,  currentUser]);

    const deleteHandler =(id) => {
        if(window.confirm('Are you sure?')) {
          
        }
    }

    return (
        <>
         <h1>Orders</h1>   
         {loading ? <Loader /> : error? <Message variant='danger'>{error}</Message>: (
             <Table striped bordered hover responsive className='table-sm'>
                 <thead>
                     <tr>
                         <td>ID</td>
                         <td>User</td>
                         <td>Date</td>              
                         <td>Total Price</td>
                         <td>Paid</td>
                         <td>Delivered</td>
                         <td></td>
                     </tr>
                 </thead>
                 <tbody>
                     {orders.map(order => ( <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.user && order.user.name}</td>    
                        <td>{order.createdAt.substring(0,10)}</td>      
                        <td>{order.totalPrice }</td>
                        <td>{order.isPaid ? (order.paidAt.substring(0,10)) : <i className="fasfa-times" style={{color:'red'}}></i>}</td>
                        <td>{order.isDelivered ? (order.deliveredAt.substring(0,10))  : <i className="fas fa-times" style={{color:'red'}}></i> }</td>
                        <td>
                            <LinkContainer to={`/order/${order._id}`}>
                                <Button variant='light' className='btn-sm'>
                                   Details
                                </Button>
                            </LinkContainer>
                        </td>
                     </tr>))}
                 </tbody>
             </Table>
         )}
        </>
    )
}

export default OrderListPage;
