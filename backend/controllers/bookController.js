import asyncHandler from 'express-async-handler';
import Book from '../models/bookModel.js';

export const getBooks = asyncHandler(async (req, res) => {
    const books = await Book.find({});
    res.json(books)
});

export const getBookById = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if(book) {
        res.json(book)
    } else {
        res.status(404);
        throw new Error('Book not found.')
    }
})

export const deleteBookById = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if(book) {
        await book.deleteOne();
        res.json({message:'Book removed.'})
    } else {
        res.status(404);
        throw new Error('Book not found.')
    }
})