import express from 'express';
import mongoose from 'mongoose';
import bookRoute from './router/bookRoute.js';
import userRoutes from './router/userRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';
// import pkg from 'pg';
// import fs from 'fs'

// const { Client } = pkg;

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello');
});
app.use('/books', bookRoute);
app.use('/user', userRoutes);
app.get('/', (req, res) => {
    res.send('welocme to')
})

// // PostgreSQL connection
// const client = new Client({
//     user: process.env.PG_USER,
//     host: process.env.PG_HOST,
//     database: process.env.PG_DATABASE,
//     password: process.env.PG_PASSWORD,
//     port: process.env.PG_PORT || 5432,
//     ssl: {
//         ca: fs.readFileSync('/home/ubuntu/Downloads/rapid-galaxy-4437-ssl-public-cert.cert')
//     }
// });

// client.connect(err => {
//     if (err) {
//         console.error('PostgreSQL connection error:', err.stack);
//     } else {
//         console.log('PostgreSQL connected!');
//     }
// });


// MongoDB connection 
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB connected...");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
