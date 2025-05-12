
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ZodSchema } from 'zod';

const validate = (schema: ZodSchema): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.errors.map(err => ({
       // field: err.path.join('.'),
        message: err.message,
      }));

      res.status(400).json({ success: false, errors });
      return; // Ensure void return, else TypeScript typing conflict occurs
    }

    req.body = result.data; // Optional: override with validated data
    next();
  };
};

export default validate;
