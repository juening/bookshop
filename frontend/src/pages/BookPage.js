import React, { useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap';
import {fetchBook, createBookReview} from '../actions/bookActions'

import Message from '../components/Message';
import Loader from '../components/Loader';
import Rating from '../components/Rating';
import { BOOK_CREATE_REVIEW_RESET } from '../constants/actionTypes';

const BookPage = ({match, history}) => {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment]= useState('');

    const dispatch = useDispatch();

    const bookDetails = useSelector(state => state.bookDetails);
    const {book, loading, error} = bookDetails;

    const bookCreateReview = useSelector(state => state.bookCreateReview);
    const {success:successReview, loading:loadingReview, error:errorReview} = bookCreateReview;

    const userLogin = useSelector(state => state.userLogin);
    const {currentUser} = userLogin;

    useEffect(() => {
        if(successReview) {
            alert('Review created.');
            setRating(0);
            setComment('');
            dispatch ({type:BOOK_CREATE_REVIEW_RESET})
        }
        dispatch(fetchBook(match.params.id))
    }, [match, dispatch, successReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createBookReview(match.params.id, {
            rating, comment
        }))
    }

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :  (  book &&  
            <>
                <Row>
                    <Col md={6} >
                        <Image src={book.image} alt={book.name} fluid />
                    </Col>
                    <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h4>{book.name}</h4>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={book.rating} text={` ${book.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: {book.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {book.description}
                        </ListGroup.Item>
                    </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Price:
                                        </Col>
                                        <Col>
                                            <strong>{book.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Status:
                                        </Col>
                                        <Col>
                                            {book.countInStock > 0 ? 'In Stock':'Out of Stock'}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                               {book.countInStock >0 && (<ListGroup.Item>
                                    <Row>
                                        <Col>Quantity</Col>
                                        <Col>
                                        <Form.Control as='select' value={qty} onChange={e => setQty(e.target.value)}>
                                            {[...Array(book.countInStock).keys()].map(x => (
                                                <option key={x+1} value={x+ 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>)}
                                <ListGroup.Item>
                                    <Button type='button' onClick={addToCartHandler} className='btn-block' disabled={book.countInStock ===0}>
                                        Add to Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <h2>
                            Reviews
                        </h2>
                        {book.reviews.length === 0 && <Message>No Reviews</Message>}
                        <ListGroup variant='flush'>
                            {book.reviews.map(review => 
                                <ListGroup.Item key={review._id}>
                                    <storng>{review.name}</storng>
                                    <Rating value={review.rating} />
                                    <p>{review.createdAt.substring(0,10)}</p>
                                    <p>{review.comment}</p>
                                </ListGroup.Item>
                                 )}
                            <ListGroup.Item>
                                <h2>Write a Customer Review</h2>
                                {errorReview && <Message variant='danger'>{errorReview}</Message>}
                                {currentUser ? (
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='rating'>
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control as='select' value={rating} onChange={e => setRating(e.target.value)}>
                                            <option value=''>Select</option>
                                            <option value='1'>1 - Poor</option>
                                            <option value='2'>2 - Fair</option>
                                            <option value='3'>3 - Good</option>
                                            <option value='4'>4 - Very Good</option>
                                            <option value='5'>5 - Excellent</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='comment'>
                                        <Form.Label>
                                            Comment
                                        </Form.Label>
                                        <Form.Control as='textarea' row='3' value={comment} onChange={e => setComment(e.target.value)}>

                                        </Form.Control>
                                    </Form.Group>
                                    <Button type='submit' variant='primary'>Submit</Button>
                                </Form>): (<Message>Please <Link to='/login'>sign in </Link>to write a review. </Message>)}
                            </ListGroup.Item>
                        </ListGroup>
                        
                    </Col>
                </Row>
                </>
           )
            }
        </>
    )
}

export default BookPage
