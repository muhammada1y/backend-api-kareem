import mongoose from 'mongoose';
const DbConnection = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`db is connect: ${con.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}

// DbConnection();

export default DbConnection;