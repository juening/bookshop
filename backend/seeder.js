import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import books from './data/books.js';
import User from './models/userModel.js';
import Book from './models/bookModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js'

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Book.deleteMany();
        await Order.deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleBooks = books.map(b => ({
            ...b, user:adminUser
        }));

        await Book.insertMany(sampleBooks);

        console.log('Data successfully imported'.green.inverse);

        process.exit();
        
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Book.deleteMany();
        await Order.deleteMany();

        console.log('Data successfully destroyed'.yellow.inverse);

        process.exit();
        
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1)
    }
}

if(process.argv[2] === '-d') {
    destroyData();
} else {
    importData()
}