import { Model } from 'mongoose';
import { TOrders } from '../orders/orders.interface';

export type TUserName = {
  firstName: string;
  lastName: string;
};
export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TUserName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TOrders;
};

export type TUserMethod = {
  isUserExists(id: number): Promise<TUser | null>;
};

export type TUserModel = Model<
  TUser,
  Record<string | number, never>,
  TUserMethod
>;
