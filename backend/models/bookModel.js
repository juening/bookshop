import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,        
    },
    rating: {
        type:Number, 
        required:true
    },
    comment:{
        type:String,
        required:true
    }
}, {timestamps:true})

const userSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
        unique:true
    },
    author:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true     
    },
    rating:{
        type:Number,
        required:true,     
        default:0
    },
    numReviews:{
        type:Number,
        required:true,
        default:0
    },
    price:{
        type:Number,
        required:true,
        default:1
    },
    countInStock:{
        type:Number,
        required:true,
        default:0
    },
    reviews:[reviewSchema],
    category:{
        type:String,
        required:true,     
    },
    binding:{
        type:String,
        required:true,
        default:'Paperback'
    }
}, {timestamps:true});

const Book = mongoose.model('Book', bookSchema);

export default Book;