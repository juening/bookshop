import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

export const addOrderItems  =  asyncHandler(async (req, res) => {
    const {orderItems, subtotalPrice, taxPrice, shippingPrice, totalPrice, shippingAddress, paymentMethod} = req.body;

    if(orderItems && orderItems.length ===0 ) {
        res.status(400);
        throw new Error('No books in cart.');
        return;
    } else {
        const order = new Order({
            user:req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            subtotalPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder)
    }
});

export const getOrderDetails = asyncHandler(async (req, res) => {
    
    const order = await Order.findById(req.params.id).populate('user', 'email name');

    if(order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found.')
    }
})