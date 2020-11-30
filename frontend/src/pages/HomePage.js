import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col} from 'react-bootstrap';

import {fetchBooks } from '../actions/bookActions'
import Book from '../components/Book';
import Message from '../components/Message';
import Loader from '../components/Loader';

const HomePage = () => {
    const dispatch = useDispatch();    

    const bookList = useSelector(state => state.bookList);
    const {books, loading ,error} = bookList;
    
    useEffect(() => {
        dispatch(fetchBooks()) 
    }, [dispatch])

    return (
        <>
            <h1>Bestsellers</h1>
            {
                loading? <Loader /> :error? <Message variant='danger'>{error}</Message> : (<Row>
                {books && books.map(book => (
                    <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
                        <Book book={book} />
                    </Col>
                ))}
            </Row>)
            }
           
        </>
    )
}

export default HomePage
