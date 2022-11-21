import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import userRoute from './routes/userRoute.js';
import artikelRoutes from './routes/artikelRoutes.js';

dotenv.config();
connectDB()
const app = express()

if(process.env.MODE === 'development'){
    app.use(morgan('dev'))
}

app.use(express.json());
app.use('/api', userRoute, artikelRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on ${PORT}`))