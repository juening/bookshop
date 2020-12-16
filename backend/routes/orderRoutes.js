import express from 'express';
const router = express.Router();

import { addOrderItems, getOrderDetails, updateOrderToPaid} from '../controllers/orderController.js'
import protect from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems);
router.route('/:id' ).get(protect, getOrderDetails);
router.route('/:id/pay' ).put(protect, updateOrderToPaid);

export default router;