import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import Loader from './Loader';
import Message from './Message';

import { getTopBooks } from '../actions/bookActions';
import { Carousel, Image } from 'react-bootstrap';
import {Link} from 'react-router-dom';


const BookCarousel = () => {

    const bookTop  = useSelector(state => state.bookTop);
    const {loading, books, error} = bookTop;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTopBooks())
    }, [dispatch])

    return loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : 
       (<Carousel pause='hover' className='bg-dark'>
           {
               books.map(book => <Carousel.Item key={book._id}>
                   <Link to={`/book/${book._id}`}>
                       <Image src={book.image} alt={book.name} fluid />
                       <Carousel.Caption className='carousel-caption'>
                           <h2>{book.name}</h2>
                       </Carousel.Caption>
                   </Link>
               </Carousel.Item> )
           }
       </Carousel>)
    
}

export default BookCarousel
