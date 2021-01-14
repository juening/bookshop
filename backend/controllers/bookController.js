import asyncHandler from 'express-async-handler';
import Book from '../models/bookModel.js';

export const getBooks = asyncHandler(async (req, res) => {
    const pageSize = 4;
    const page = Number (req.query.pageNumber) || 1;
    const keyword = req.query.keyword? {
        name:{
            $regex: req.query.keyword,
            $options: 'i'
        }
    }: {}

    const count = await Book.countDocuments({...keyword});
    const books = await Book.find({...keyword}).limit(pageSize).skip(pageSize * (page -1));
    const pages = Math.ceil(count/pageSize);

    res.json({books, page, pages})
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

export const createBook = asyncHandler(async (req, res) => {
    const newBook = new Book({
        name:'Test Book',
        price:1,
        user:req.user._id,
        image:'sample.jpg',
        category:'sample cate',
        author:'Ted Smith',
        description:'Test des',
        numReviews:3,
        rating:5,
        price:10,
        binding:'hardcover',
        countInStock:7
    });

    const createdBook =await newBook.save();

    res.status(201).json(createdBook);
});

export const createReview = asyncHandler(async (req, res) => {
    const {rating, comment} = req.body;
    const book = await Book.findById(req.params.id);

    if(book) {
        const alreadyReviewed = book.reviews.find(review => review.user.toString() === req.user._id.toString());

        if(alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed.')
        } else {
            const review = {
                comment,
                rating:Number(rating),
                user:req.user._id,
                name:req.user.name
            };
            book.reviews.push(review);
            book.numReviews = book.reviews.length;
            book.rating = (book.reviews.reduce((acc, item) => acc + item.rating, 0) / book.numReviews).toFixed(1);
        }

        await book.save();
        res.status(201).json({message: 'Review added.'})
    } else {
        res.status(404);
        throw new Error('Book does not exist.')
    }
})

export const updateBook = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        image,
        category,
        author,
        description,
        numReviews,
        rating,
        binding,
        countInStock
    } = req.body;

    const book =await  Book.findById(req.params.id);

    if(book) {
        book.name = name || book.name;
        book.price = price || book.price,
        book.image = image || book.image;
        book.category = category || book.category;
        book.author = author || book.author;
        book.description = description || book.description;
        book.numReviews = numReviews || book.numReviews;
        book.rating= rating || book.rating;
        book.binding = binding || book.binding;
        book.countInStock = countInStock || book.countInStock;

        const updatedBook = await book.save();
        res.json(updatedBook);
    } else {
        res.status(404);
        throw new Error('Book not found.')
    }
})