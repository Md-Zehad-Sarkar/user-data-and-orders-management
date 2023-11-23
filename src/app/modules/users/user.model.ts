import { Schema, model } from 'mongoose';
import { TAddress, TUser, TUserName } from './user.interface';

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
const usersSchema = new Schema<TUser>({
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
  age: { type: Number,trim:true, required: [true, 'age field is required'] },
  email: { type: String, required: [true, 'email field is required'] },
  isActive: { type: Boolean, default: true },
  hobbies: { type: [{ type: String, trim: true }], default: [] },
  address: { type: userAddressSchema, required: [true, 'address is required'] },
});

export const UserModel = model<TUser>('Users', usersSchema);
