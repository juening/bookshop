import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import connectDB from './config/db.js'

import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import bookRoutes from './routes/bookRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

connectDB();

const PORT =  process.env.PORT || 5000;

const app = express();

if(process.env.NODE_ENV ='development') {
    app.use(morgan('dev'))
}

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...')
});

app.use('/api/books', bookRoutes);
app.use('/api/user', userRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, function(){
    console.log(`App is running in ${process.env.NODE_ENV} on ${PORT}`.green.bold)
} );