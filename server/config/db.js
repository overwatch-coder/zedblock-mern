import mongoose from "mongoose";

const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log('MongoDB connected and running');
    });
}

export default connectDB;