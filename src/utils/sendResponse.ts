// src/utils/sendResponse.ts
import { Response } from 'express';
// import { ApiResponse } from '../types';
import { ApiResponse } from '../types';

export function sendResponse<T>(res: Response<ApiResponse<T>>, statusCode: number, payload: ApiResponse<T>) {
  res.status(statusCode).json(payload);
}
