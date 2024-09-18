import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;
// import { Sequelize, DataTypes } from 'sequelize';
// import dotenv from 'dotenv';
// import fs from 'fs';

// dotenv.config();

// // Initialize Sequelize
// const sequelize = new Sequelize({
//     username: process.env.PG_USER,
//     host: process.env.PG_HOST,
//     database: process.env.PG_DATABASE,
//     password: process.env.PG_PASSWORD,
//     port: process.env.PG_PORT || 5432,
//     dialect: 'postgres',
//     dialectOptions: {
//         ssl: {
//             ca: fs.readFileSync('/home/ubuntu/Downloads/rapid-galaxy-4437-ssl-public-cert.cert')
//         }
//     }
// });

// // Define the User model
// const User = sequelize.define('User', {
//     username: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// }, {
//     timestamps: true
// });

// sequelize.sync()
//     .then(() => console.log('User model synced with PostgreSQL database'))
//     .catch(err => console.error('Error syncing User model:', err));

// export default User;
