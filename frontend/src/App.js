import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookPage from './pages/BookPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/login' component={LoginPage} />
          <Route path='/book/:id' component={BookPage} />
          <Route path='/cart/:id?' component={CartPage} />
          <Route exact path='/' component={HomePage} />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>

  );
}

export default App;
