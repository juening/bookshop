import React , {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Table, Button, Row, Col} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';

import {fetchBooks, deleteBook} from '../actions/bookActions'

const BookListPage = ({history}) => {
    const dispatch = useDispatch();

    const bookList = useSelector(state => state.bookList);
    const {books, error, loading} = bookList;

    const userLogin = useSelector(state => state.userLogin);
    const {currentUser} = userLogin;


    useEffect(() => {

        if(currentUser && currentUser.isAdmin) {
            dispatch(fetchBooks());
        } else {
            history.push('/login')
        }
    }, [dispatch, history,  currentUser]);

    const deleteHandler =(id) => {
        if(window.confirm('Are you sure?')) {
            dispatch(deleteBook(id));
        }
    }

    const createBookHandler = () => {

    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Books</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createBookHandler}>
                        <i className="fas fa-plus"></i> Create Book
                    </Button>
                </Col>
            </Row>
   
            {loading ? <Loader /> : error? <Message variant='danger'>{error}</Message>: (
                <Table striped bordered hover responsive className='table-md'>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>NAME</td>
                            <td>PRICE</td>
                            <td>CATEGOTY</td>
                            <td>AUTHOR</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book => ( <tr key={book._id}>
                            <td>{book._id}</td>
                            <td>{book.name}</td>
                            <td>
                                {book.price}
                          </td>
                            <td>{book.category}</td>
                            <td>{book.author}</td>
                            <td>
                                <LinkContainer to={`/admin/book/${book._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className="fas fa-edit"></i>
                                    </Button>
                                </LinkContainer>
                            </td>
                            <td>
                                <Button variant='danger' className='btn-sm' onClick={()=> deleteHandler(book._id)}>
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

export default BookListPage;
