import React , {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Table, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';

import {listUsers, deleteUser} from '../actions/userActions'

const UserListPage = ({history}) => {
    const dispatch = useDispatch();

    const userList = useSelector(state => state.userList);
    const {users, error, loading} = userList;

    const userLogin = useSelector(state => state.userLogin);
    const {currentUser} = userLogin;

    const userDelete = useSelector(state => state.userDelete);
    const {success:successDelete} = userDelete;

    useEffect(() => {

        if(currentUser && currentUser.isAdmin) {
            dispatch(listUsers());
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, currentUser]);

    const deleteHandler =(id) => {
        if(window.confirm('Are you sure?')) {
            dispatch(deleteUser(id));
        }
    }

    return (
        <>
         <h1>USERS</h1>   
         {loading ? <Loader /> : error? <Message variant='danger'>{error}</Message>: (
             <Table striped bordered hover responsive className='table-sm'>
                 <thead>
                     <tr>
                         <td>ID</td>
                         <td>NAME</td>
                         <td>EMAIL</td>
                         <td>isAdmin</td>
                         <td></td>
                     </tr>
                 </thead>
                 <tbody>
                     {users.map(user => ( <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td><a href={`mailto:${user.email}`}>
                            {user.email}
                            </a></td>
                        <td>{user.isAdmin? <i className='fas fa-check' style={{color:'grren'}}></i> : <i className='fas fa-times' style={{color:'red'}}></i> }</td>
                        <td>
                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                <Button variant='light' className='btn-sm'>
                                    <i className="fas fa-edit"></i>
                                </Button>
                            </LinkContainer>
                            <Button variant='danger' className='btn-sm' onClick={()=> deleteHandler(user._id)}>
                                    <i className="fas fa-delete"></i>
                            </Button>
                        </td>
                     </tr>))}
                 </tbody>
             </Table>
         )}
        </>
    )
}

export default UserListPage;
