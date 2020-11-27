import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap';
import books from '../books'

import Rating from '../components/Rating';

const BookPage = ({match}) => {
    const book = books.find(b => b._id === match.params.id);

    return (
        <div>
           <Link className='btn btn-light my-3' to='/'>
               Go Back
           </Link>
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
                            <ListGroup.Item>
                                <Button type='button' className='btn-block' disabled={book.countInStock ===0}>
                                    Add to Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                   </Card>
               </Col>
           </Row>

        </div>
    )
}

export default BookPage
