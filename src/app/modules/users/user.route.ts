import express from 'express';
import { userController } from './user.controller';
const router = express.Router();

//create user route
router.post('/api/users', userController.createUser);
//get all users
router.get('/api/users', userController.getAllUsers);
//get user by id
router.get('/api/users/:userId');

export const userRoutes = router;
