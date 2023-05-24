import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()


const connectdb = async () => {
    const url = process.env.MONGO_URL
    try {
        const conn = await mongoose.connect(url)
        console.log(`Mongodb conectio successfully ${conn.connection.host}`.green.bold.underline);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectdb;