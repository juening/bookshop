import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js'

import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import bookRoutes from './routes/bookRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

connectDB();

const PORT =  process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...')
});

app.use('/api/books', bookRoutes);
app.use('/api/user', userRoutes)

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, function(){
    console.log(`App is running in ${process.env.NODE_ENV} on ${PORT}`.green.bold)
} );