import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js'
import books from './data/books.js';

dotenv.config();

connectDB();

const PORT =  process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.get('/api/books', (req, res)=> {
    res.json(books)
});

app.get('/api/book/:id', (req, res) => {
    const book = books.find(b =>b._id === req.params.id);
    res.json(book);
});

app.listen(PORT, function(){
    console.log(`App is running in ${process.env.NODE_ENV} on ${PORT}`.green.bold)
} );