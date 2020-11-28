const express = require('express');
const books = require('./data/books')

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


app.listen(5000, function(){
    console.log('App is litening on ', 5000)
} );