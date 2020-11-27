import React from 'react';
import {Card} from 'react-bootstrap';
import Rating from './Rating'

const Book = ({book}) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <a href={`/book/${book._id}`}  title={book.name}>
                <Card.Img src={book.image} variant='top' />
            </a>

            <Card.Body>
                <a href={`/book/${book._id}` } >
                    <Card.Title as='div' className='title'>
                        <strong>{book.name}</strong>
                    </Card.Title>
                </a>

                <Card.Text as='div'>
                    <Rating value={book.rating} text={` ${book.numReviews} reviews` } />
                </Card.Text>
                <Card.Text as='h3'>
                    ${book.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Book
