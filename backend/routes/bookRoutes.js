import express from 'express';
const router = express.Router();

import {getBooks, getBookById, deleteBookById, createBook, updateBook} from '../controllers/bookController.js';
import {protect, admin} from '../middleware/authMiddleware.js';


router.route('/').get(getBooks).post(createBook)

router.route('/:id').get(getBookById).delete(protect, admin, deleteBookById).put(protect, admin, updateBook);

export default router;