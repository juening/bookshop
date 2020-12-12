import express from 'express';
const router = express.Router();

import { addOrderItems, getOrderDetails} from '../controllers/orderController.js'
import protect from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems);
router.route('/:id' ).get(protect, getOrderDetails);

export default router;