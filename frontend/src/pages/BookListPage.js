import React , {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Table, Button, Row, Col} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';

import {BOOK_CREATE_RESET} from '../constants/actionTypes';
import {fetchBooks, deleteBook, createBook} from '../actions/bookActions'

const BookListPage = ({history}) => {
    const dispatch = useDispatch();

    const bookList = useSelector(state => state.bookList);
    const {books, error, loading} = bookList;

    const bookDelete = useSelector(state => state.bookDelete);
    const {success:successDelete, error:errorDelete, loading:loadingDelete} = bookDelete;

    const userLogin = useSelector(state => state.userLogin);
    const {currentUser} = userLogin;

    const bookCreate = useSelector(state => state.bookCreate);
    const {loading: loadingCreate, error: errorCreate, createdBook} = bookCreate;


    useEffect(() => {
        dispatch({type:BOOK_CREATE_RESET});
        if(!currentUser || !currentUser.isAdmin) {
            history.push('/login')
        } 

        if(createdBook) {
            history.push(`/admin/book/${createdBook._id}/edit`)
        } else {
            dispatch(fetchBooks())
        }

    }, [dispatch, history,  currentUser, createdBook]);

    const deleteHandler =(id) => {
        if(window.confirm('Are you sure?')) {
            dispatch(deleteBook(id));
        }
    }

    const createBookHandler = () => {
        dispatch(createBook())
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
            {loadingDelete && <Loader /> } 
            { errorDelete && <Message variant='danger'>{errorDelete}</Message> }
            {loadingCreate && <Loader /> } 
            { errorCreate && <Message variant='danger'>{errorCreate}</Message> }
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
