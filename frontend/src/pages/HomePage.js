import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col} from 'react-bootstrap';

import {fetchBooks } from '../actions/bookActions'
import Book from '../components/Book';


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
                loading? <h3>Loading...</h3> :error? <h3>{error}</h3>: (<Row>
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
