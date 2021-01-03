import express from 'express';
const router = express.Router();

import {getBooks, getBookById, deleteBookById} from '../controllers/bookController.js';
import {protect, admin} from '../middleware/authMiddleware.js';


router.route('/').get(getBooks)

router.route('/:id').get(getBookById).delete(protect, admin, deleteBookById);

export default router;