import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected with MongoDB successfully!");
    } catch (error) {
        console.log(`MONGO DB CONNECTION ERROR: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB


