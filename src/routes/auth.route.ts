import express from 'express'
import { register, login, profile } from '../controllers/auth.controller';
import catchAsync from '../utils/catchAsync';
import { authenticate } from '../middlewares/auth.middleware';

import validate from '../middlewares/validate';
import { signupSchema, signInSchema } from '../validations/schemas/auth.schema';


const router = express.Router();

router.route('/register').post(validate(signupSchema), catchAsync(register));
router.route('/login').post(validate(signInSchema), catchAsync(login));

router.route('/profile').get(authenticate, catchAsync(profile));

export default router;