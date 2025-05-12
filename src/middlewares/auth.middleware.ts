import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IJwtPayload } from '../types/jwt';
import User from '../models/user.model';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Extract token from Authorization header or cookies
    let token = req.header('Authorization')?.replace('Bearer ', '') || req.cookies.token;

    // If no token provided, send response and return
    if (!token) {
      res.status(403).json({ message: 'Access denied. No token provided.' });
      return;
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as IJwtPayload;

    // Find the user associated with the decoded ID
    const user = await User.findById(decoded.id);

    // If user is not found, send response and return
    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    // Attach user data to the request object
    req.user = user;

    // Proceed to the next middleware or controller
    next();
  } catch (error) {
    // Handle JWT verification errors and token expiration
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: 'Invalid or expired token.' });
      return;
    }

    // Handle any unexpected errors
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
};