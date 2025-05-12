import User from '../models/user.model';
import { IUser } from '../types/user'; 

// Find a user by email
export const findByEmail = (email: string) => {
  return User.findOne({ email }).exec();
};

// Find a user by ID
export const findById = (id: string) => {
  return User.findById(id).exec();
};

// Create a new user
export const createUser = (userData: Partial<IUser>) => {
  const user = new User(userData);
  return user.save();
};
