// Register a new user
import * as authRepository from '../repositories/auth.repository';
import { IUser } from '../types/user';
import { IJwtPayload } from '../types/jwt';
import generateJWTToken from '../utils/jwtHelper';

export const register = async (userData: Partial<IUser>) => {
    const existingUser = await authRepository.findByEmail(userData.email!);
    if (existingUser) {
        throw new Error("Email is already registered");
    }
    const createdUser = await authRepository.createUser(userData);
    const { password, ...userWithoutPassword } = createdUser.toObject();
    return userWithoutPassword;
};

export const login = async (email: string, password: string) => {
    const user = await authRepository.findByEmail(email);
    if (!user) {
        throw new Error("Invalid email or password");
    }
    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }
    // Create token
    const payload: IJwtPayload = {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
    };
    const token = generateJWTToken(payload)
    const { password: _, ...userData } = user.toObject();
    return { user: userData, token };
};

export const getProfile = async (userId: string) => {
  const user = await authRepository.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const { password, ...userData } = user.toObject();
  return userData;
};