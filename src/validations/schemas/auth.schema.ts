// src/validations/auth.schema.ts
import { z } from 'zod';

export const signupSchema = z.object({
    firstName: z.string().min(1, 'First Name is required'),
    lastName: z.string().min(1, 'Last Name is required'),
    email: z.string().email('Invalid email address'),
    role: z.enum(['admin', 'user'], { message: 'Role must be provided' }),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    password_confirmation: z.string().min(6, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ['password_confirmation'],
    message: 'Passwords do not match',
  });


  export const signInSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long')
  })
