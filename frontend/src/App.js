import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookPage from './pages/BookPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import UserListPage from './pages/UserListPage';
import UserEditPage from './pages/UserEditPage';
import BookListPage from './pages/BookListPage';
import BookEditPage from './pages/BookEditPage';
import OrderListPage from './pages/OrderListPage';


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/login' component={LoginPage} />
          <Route path='/order/:id' component={OrderDetailsPage} />
          <Route path='/payment' component={PaymentPage} />
          <Route path='/placeorder' component={PlaceOrderPage} />
          <Route path='/shipping' component={ShippingPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/profile' component={ProfilePage} />
          <Route path='/book/:id' component={BookPage} />
          <Route path='/cart/:id?' component={CartPage} />
          <Route path='/admin/user/:id/edit' component={UserEditPage} />
          <Route path='/admin/book/:id/edit' component={BookEditPage} />
          <Route path='/admin/users' component={UserListPage} />
          <Route path='/admin/books' component={BookListPage} />
          <Route path='/admin/orders' component={OrderListPage} />
          <Route path='/search/:keyword' component={HomePage} />
          <Route exact path='/' component={HomePage} />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>

  );
}

export default App;
