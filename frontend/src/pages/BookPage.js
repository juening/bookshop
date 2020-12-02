import React, { useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap';
import {fetchBook} from '../actions/bookActions'

import Message from '../components/Message';
import Loader from '../components/Loader';
import Rating from '../components/Rating';

const BookPage = ({match, history}) => {
    const [qty, setQty] = useState(1);

    const dispatch = useDispatch();

    const bookDetails = useSelector(state => state.bookDetails);
    const {book, loading, error} = bookDetails;

    useEffect(() => {
        dispatch(fetchBook(match.params.id))
    }, [match, dispatch])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :  (  book&&  
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
           )
            }
        </>
    )
}

export default BookPage
