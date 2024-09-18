import express from 'express';
import userController from '../controller/userController.js';

const router = express.Router();

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser)

export default router;
