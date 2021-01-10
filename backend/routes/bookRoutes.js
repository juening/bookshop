import express from 'express';
const router = express.Router();

import {getBooks, getBookById, deleteBookById, createBook, updateBook, createReview} from '../controllers/bookController.js';
import {protect, admin} from '../middleware/authMiddleware.js';


router.route('/').get(getBooks).post(protect, admin, createBook)

router.route('/:id/reviews').post(protect, createReview);

router.route('/:id').get(getBookById).delete(protect, admin, deleteBookById).put(protect, admin, updateBook);

export default router;