import React , {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link } from 'react-router-dom';
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap';
import {addItem, setCartQuantity, clearItem} from '../actions/carActions'
import Message from '../components/Message';

const CartPage = ({match, location, history}) => {
    const bookId = match.params.id;

    const qty = location.search? Number(location.search.split('=')[1]):1;

    const dispatch = useDispatch();

    const cart =  useSelector(state=> state.cart);
    const {cartItems} = cart;

    useEffect(() => {
        if(bookId) {
            dispatch(addItem(bookId, qty))
        }
    }, [dispatch, bookId, qty]);

    const clearItemFromCart = id => {
        dispatch(clearItem(id))
    }

    const checkoutHandler = () => {
        history.push('login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length ===0 ? <Message><span>Your cart is empty. </span>  <Link to='/'> <span className='ml-5'>Go Back</span> </Link> </Message> : 
                (<ListGroup variant='flush'>
                    {cartItems.map(item => (
                        <ListGroup.Item key={item._id}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded />
                                </Col>
                                <Col md={3}>
                                    <Link to={`/book/${item._id}`}>
                                        {item.name}
                                    </Link>
                                </Col>
                                <Col md={2}>
                                    ${item.price}
                                </Col>
                                <Col md={2}>
                                <Form.Control as='select' value={item.qty} onChange={e => dispatch(setCartQuantity(item._id, Number(e.target.value)))}>
                                    {[...Array(item.countInStock).keys()].map(x => (
                                        <option key={x+1} value={x+ 1}>
                                            {x + 1}
                                        </option>
                                    ))}
                                </Form.Control>
                                </Col>
                                <Col md={2}>
                                    <Button type='button' variant='light' onClick={() => clearItemFromCart(item._id)}>
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                )
                    }
            </Col>

            <Col md={4}>
                
                <Card >
                <ListGroup>
                    <ListGroup.Item>
                        <h2>Subtotal: ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) books.</h2>
                        ${cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button type='button' className='btn-block' disabled={cartItems.length ===0} onClick={checkoutHandler}>
                            Proceed to Checkout
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
     
                </Card>
            </Col>

        </Row>
    )
}

export default CartPage
