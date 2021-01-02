import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {logOut} from '../actions/userActions';

const Header = () => {


    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logOut());
    } 

    const userLogin= useSelector(state => state.userLogin);
    const {currentUser} = userLogin;

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand >The Little Read Book</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ml-auto'>
                            <LinkContainer to='/cart'>
                                <Nav.Link >
                                    <i className='fas fa-shopping-cart'></i> 
                                    Cart
                                </Nav.Link>
                            </LinkContainer>
                            {currentUser? 
                            (<NavDropdown title={currentUser.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>
                                        Profile
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>): 
                            (<LinkContainer to='/login'>
                                <Nav.Link > 
                                    <i className='fas fa-user'></i> Sign In
                                </Nav.Link>
                            </LinkContainer>)  }
                         {
                             currentUser && currentUser.isAdmin&& 
                             (<NavDropdown title='admin' id='admin'>
                                 <LinkContainer to='/admin/users'>
                                     <NavDropdown.Item>
                                         Users
                                     </NavDropdown.Item>
                                 </LinkContainer>
                                 <LinkContainer to='/admin/books'>
                                     <NavDropdown.Item>
                                         Books
                                     </NavDropdown.Item>
                                 </LinkContainer>
                                 <LinkContainer to='/admin/orderlist'>
                                     <NavDropdown.Item>
                                         Orders
                                     </NavDropdown.Item>
                                 </LinkContainer>
                             </NavDropdown>)
                         }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
