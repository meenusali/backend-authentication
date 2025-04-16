import mongoose from "mongoose"


const connectDB = async () => {
    console.log(process.env.MONGO_URL)
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongodb connected")
    } catch (error) {
        console.log(error);
        
        console.error("connection error")
        process.exit(1)
    }
}

export default connectDB;