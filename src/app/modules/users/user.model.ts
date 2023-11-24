import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  TAddress,
  TUser,
  TUserMethod,
  TUserModel,
  TUserName,
} from './user.interface';
import config from '../../config';

//fullName schema
const fullNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [20, 'firstName can not more then 20 letter'],
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [20, 'lastName can not more then 20 letter'],
  },
});

//address schema
const userAddressSchema = new Schema<TAddress>({
  street: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
});

//users schema
const usersSchema = new Schema<TUser, TUserModel, TUserMethod>({
  userId: {
    type: Number,
    unique: true,
    trim: true,
    required: [true, 'Please input an unique userId'],
  },
  username: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Please input an unique username'],
    maxlength: [32, 'username can not more then 32 letters'],
  },
  password: { type: String, required: true, trim: true },
  fullName: { type: fullNameSchema, required: [true, 'fullName is required'] },
  age: { type: Number, trim: true, required: [true, 'age field is required'] },
  email: { type: String, required: [true, 'email field is required'] },
  isActive: { type: Boolean, default: true },
  hobbies: { type: [{ type: String, trim: true }], default: [] },
  address: { type: userAddressSchema, required: [true, 'address is required'] },
});

//middleware
usersSchema.pre('save', async function (next) {
  // const user = this;
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt));
  next();
});

usersSchema.post('save', function (res, next) {
  res.password = '';
  next();
});

//instance method
usersSchema.methods.isUserExists = async function (id: number) {
  const existingUser = await UserModel.findOne({ userId: id });
  return existingUser;
};

export const UserModel = model<TUser, TUserModel>('Users', usersSchema);
