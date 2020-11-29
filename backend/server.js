import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js'

import bookRoutes from './routes/bookRoutes.js';

dotenv.config();

connectDB();

const PORT =  process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => {
    res.send('API is running...')
});

app.use('/api/books', bookRoutes);

app.use((req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
})

app.use((err, req, res,next) => {
    const errorStatusCode = res.statusCode ===200?500:res.statusCode;
    res.status(errorStatusCode);
    res.json({
        message:err.message,
        stack: process.env.NODE_ENV ==='production'? null: err.stack
    })
})

app.listen(PORT, function(){
    console.log(`App is running in ${process.env.NODE_ENV} on ${PORT}`.green.bold)
} );