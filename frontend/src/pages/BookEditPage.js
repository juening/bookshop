import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {Form, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';

import {  fetchBook, updateBook} from '../actions/bookActions';
import {BOOK_UPDATE_RESET} from '../constants/actionTypes'; 
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';

const BookEditPage = ({match, history}) => {
    const bookId = match.params.id;
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [author, setAuthor] = useState('');
    const [binding, setBinding] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [uploading, setUpLoading] = useState(false);

    const bookDetails = useSelector(state => state.bookDetails);
    const {loading, error, book} = bookDetails;

    const bookUpdate = useSelector(state => state.bookUpdate);
    const {loading:loadingUpdate, success:successUpdate, error:errorUpdate} = bookUpdate;

    const dispatch = useDispatch();

    useEffect(() => {
        if(successUpdate) {
            dispatch({type:BOOK_UPDATE_RESET});
            history.push('/admin/books');
        } else {
            if(!book || book._id !== bookId ) {
                dispatch(fetchBook(bookId));
            } else {
                setName(book.name);
                setPrice(book.price);
                setImage(book.image);
                setDescription(book.description);
                setCategory(book.category);
                setAuthor(book.author);
                setBinding(book.binding);
                setCountInStock(book.countInStock);
            }        
        }

    }, [bookId, dispatch, book, history, successUpdate])

    const submitHandler = e => {
        e.preventDefault();
        dispatch(updateBook({
            _id: bookId,
            name, price, image, author, description, category, binding, countInStock
        }))
    }

    const uploadFileHandler = async (e) => {
        const file= e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUpLoading(true);

        try {
            const config = {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/api/upload', formData, config);
           
            setImage(data);
            setUpLoading(false)
        } catch (error) {
            console.error(error);
            setUpLoading(false);
        }
    }

    return (
        <>
            <Link to='/admin/books' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Update Book Information</h1>
                {loadingUpdate && <Loader /> }
                { errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading? <Loader /> : error ? <Message variant='danger'>{error}</Message> :(
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Book Name</Form.Label>
                            <Form.Control type='text' placeholder='Book Name' value={name} onChange={e=> setName(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type='number' placeholder='Book Price' value={price} onChange={e=>setPrice(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control type='text' placeholder='Image url' value={image} onChange={e=>setImage(e.target.value)}>
                            </Form.Control>
                            <Form.File id='image-file' label='Choose File' custom onChange={uploadFileHandler}></Form.File>
                            {uploading && <Loader />}
                        </Form.Group>
                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type='text' placeholder='Book Description' onChange={e=>setDescription(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control type='text' placeholder='Category' onChange={e=>setCategory(e.target.value)}>
                            </Form.Control>
                        </Form.Group>       
                        <Form.Group controlId='author'>
                            <Form.Label>Author</Form.Label>
                            <Form.Control type='text' placeholder='Author' onChange={e=>setAuthor(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='binding'>
                            <Form.Label>Book Binding</Form.Label>
                            <Form.Control type='text' placeholder='Book Binding' onChange={e=>setBinding(e.target.value)}>
                            </Form.Control>
                        </Form.Group>    
                        <Form.Group controlId='countinstock'>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control type='number' placeholder='Count in stock' onChange={e=>setCountInStock(e.target.value)}>
                            </Form.Control>
                        </Form.Group>    
                        <Button type='submit' variant='primary'>Update</Button>
                    </Form>
                )}

            </FormContainer>
        </>

    )
}

export default BookEditPage;
