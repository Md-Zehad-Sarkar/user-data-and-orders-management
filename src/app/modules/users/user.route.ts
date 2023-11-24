import express from 'express';
import { userController } from './user.controller';
const router = express.Router();

//create user route
router.post('/api/users', userController.createUser);
//get all users
router.get('/api/users', userController.getAllUsers);
//get user by id
router.get('/api/users/:userId', userController.getUsersById);

//update user info
router.put('/api/users/:userId', userController.updateUser);

//delete user
router.delete('/api/users/:userId', userController.deletedUser);

//order add 
router.put('/api/users/:userId/orders',userController.addUserOrders);

export const userRoutes = router;
