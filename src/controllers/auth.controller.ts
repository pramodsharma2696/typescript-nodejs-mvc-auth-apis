import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { sendResponse } from '../utils/sendResponse';
import { ApiResponse } from '../types';

export const register = async (req: Request, res: Response) => {
    const userData = req.body;
    const user = await authService.register(userData);
    sendResponse(res, 201, {
        status: true,
        message: 'User registered successfully',
        data: user,
    });
};
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await authService.login(email, password);

    sendResponse(res, 200, {
        status: true,
        message: 'Login successful',
        data: result,
    });
};

export const profile = async (req: Request, res: Response) => {
  const userId = req.user?._id
  const userData = await authService.getProfile(userId!);
  sendResponse(res, 200, {
    status: true,
    message: 'Profile fetched successfully',
    data: userData,
  });
};