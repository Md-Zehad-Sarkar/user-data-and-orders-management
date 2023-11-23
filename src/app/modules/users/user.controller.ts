import { Request, Response } from 'express';
import { userServices } from './user.services';
import { usersZodSchema } from './zod.validation';

//create users
const createUser = async (req: Request, res: Response) => {
  try {
    const { users: userData } = req.body;
    const userZodParser = usersZodSchema.parse(userData);
    const createdUser = await userServices.createUsersIntoDB(userZodParser);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: createdUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Users could not create',
      errors: {
        code: res.statusCode,
        description: 'Users could not create',
      },
    });
  }
};

//get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await userServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: allUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Users could not create',
      errors: {
        code: res.statusCode,
        description: 'Users could not create',
      },
    });
  }
};

//get users by id
const getUsersById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const users = await userServices.getUsersByIdFromDB(userId);
    if (!users) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        errors: {
          code: res.statusCode,
          description: 'User not found',
        },
      });
    }
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      errors: {
        code: res.statusCode,
        description: res.statusMessage,
      },
    });
  }
};

export const userController = { createUser, getAllUsers, getUsersById };
