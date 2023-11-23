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
    const allUsers = await UserModel.find({},{ password: 0 });
    return allUsers;
  } catch (error) {
    console.log('getAllUsersFromDB', error);
  }
};

//get user by id
const getUsersByIdFromDB = async (id: string | number) => {
  try {
    const userById = await UserModel.findOne({ userId: id }, { password: 0 });
    if (!userById) {
      return { message: 'User not found' };
    }
    return userById;
  } catch (error) {
    console.log(error);
  }
};

export const userServices = {
  createUsersIntoDB,
  getAllUsersFromDB,
  getUsersByIdFromDB,
};
