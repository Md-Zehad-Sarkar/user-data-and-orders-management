/* eslint-disable @typescript-eslint/no-explicit-any */
import { TOrders } from '../orders/orders.interface';
import { TUser } from './user.interface';
import { UserModel } from './user.model';

//create user
const createUsersIntoDB = async (user: TUser) => {
  try {
    const users = await UserModel.create(user);
    return users;
  } catch (error: any) {
    throw new Error(error);
  }
};

//get all users
const getAllUsersFromDB = async () => {
  try {
    const allUsers = await UserModel.find(
      {},
      {
        _id: 0,
        password: 0,
      },
    ).select({
      _id: 0,
      password: 0,
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      address: 1,
    });
    return allUsers;
  } catch (error: any) {
    throw new Error(error);
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
  } catch (error: any) {
    throw new Error(error);
  }
};

//update user info
const updateUsersDB = async (id: string | number, updateDoc: TUser) => {
  try {
    const updateUser = await UserModel.findOneAndUpdate(
      { userId: id },
      {
        $set: {
          userId: updateDoc.userId,
          username: updateDoc.username,
          password: updateDoc.password,
          fullName: {
            'fullName.firstName': updateDoc.fullName.firstName,
            'fullName.lastName': updateDoc.fullName.lastName,
          },
          age: updateDoc.age,
          email: updateDoc.email,
          isActive: updateDoc.isActive,
          hobbies: updateDoc.hobbies,
          address: updateDoc.address,
        },
      },
      { new: true },
    ).select({ password: 0 });

    return updateUser;
  } catch (error: any) {
    throw new Error(error);
  }
};

//delete users
const deleteUserFromDB = async (id: string | number) => {
  const result = await UserModel.deleteOne({ userId: id });
  return result;
};

export const userServices = {
  createUsersIntoDB,
  getAllUsersFromDB,
  getUsersByIdFromDB,
  updateUsersDB,
  deleteUserFromDB,
};
