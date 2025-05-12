import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cookiParser from 'cookie-parser';
import session from 'express-session'
import cors from 'cors'
import authRoute from './routes/auth.route'
import errorHandler from './middlewares/error.handler';
import { ApiResponse } from './types/index';
import { sendResponse } from './utils/sendResponse';

const app = express();

// Middleware to parse incoming JSON payloads in the request body
app.use(express.json());

// Middleware to parse cookies in the request headers
app.use(cookiParser());

// Middleware for enabling Cross-Origin Resource Sharing (CORS)
// Allows requests from specific origins and allows credentials (cookies, headers, etc.) to be sent
app.use(cors({
    origin: process.env.CLIENT_URL,   // Allow requests from the specified client URL
    credentials: true                 // Allow cookies and credentials to be sent with the request
}));

// Middleware to handle session management
// The secret key is used to sign the session ID cookie, ensuring session integrity
app.use(session({
    secret: process.env.JWT_SECRET!,  // Secret key for signing the session cookie (must be set in .env)
    resave: false,                    // Do not save the session if it hasn't been modified
    saveUninitialized: false,         // Don't create sessions for requests that don't modify the session
    cookie: {
        secure: process.env.NODE_ENV === 'production',  // Ensure cookies are only sent over HTTPS in production
        httpOnly: true                                     // Prevent JavaScript from accessing cookies (more secure)
    }
}));


// Mount the authentication routes at '/api/auth' URL prefix
app.use('/api/auth', authRoute);

app.get("/", (req: express.Request, res: express.Response) => {
  sendResponse(res, 200, {
    status: true,
    message: 'Welcome to Node Auth API',
    data: { version: '1.0.0' }
  });
});

// Middleware for handling errors globally in the application
// This will catch and handle any errors not already handled
app.use(errorHandler);


export default app;