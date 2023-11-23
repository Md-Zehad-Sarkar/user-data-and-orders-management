import { TUser } from './user.interface';
import { UserModel } from './user.model';

//create user
const createUsersIntoDB = async (user: TUser) => {
  try {
    const users = await UserModel.create(user);
    return users;
  } catch (error) {
    console.log('db error', error);
  }
};

//get all users
const getAllUsersFromDB = async () => {
  try {
    const allUsers = await UserModel.find();
    return allUsers;
  } catch (error) {
    console.log('getAllUsersFromDB', error);
  }
};

export const userServices = { createUsersIntoDB, getAllUsersFromDB };
