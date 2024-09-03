import express from 'express';
import mongoose from 'mongoose';
import bookRoute from './router/bookRoute.js';
import userRoutes from './router/userRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello');
});
app.use('/books', bookRoute);
app.use('/user', userRoutes);

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Database Connected...");
    })
    .catch((error) => {
        console.log("App not connected:", error);
    });

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
