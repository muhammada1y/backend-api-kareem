import express from "express";
import dotenv from "dotenv";
import DbConnection from "./src/dbConnection/db.js";
import router from "./src/routes/userRoutes.js";
import { errorHandler,notFound } from "./src/middleware/errorHandler.js";

dotenv.config()
const app = express()
app.use(express.json());

const PORT = process.env.PORT;

DbConnection();

app.use('/api/user/',router)


app.use(errorHandler);
app.use(notFound);
    
app.listen(PORT,()=>{
    console.log(`backend server is running on ${PORT}`)
});