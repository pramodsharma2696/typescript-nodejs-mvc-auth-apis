import jwt, { SignOptions } from 'jsonwebtoken';
import ms from 'ms';
import { IJwtPayload } from '../types/jwt';

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const generateJWTToken = (payload: IJwtPayload, expiresIn: string = JWT_EXPIRES_IN!): string => {
    const secretKey = process.env.JWT_SECRET!;
    if (!secretKey) {
        throw new Error('JWT_SECRET is not defined in .env');
    }

    // First try to parse the string as a time format (e.g., '1h', '2d')
    const expiresInMs = ms(expiresIn as ms.StringValue); // Type assertion here

    if (typeof expiresInMs === 'number') {
        // If successful, convert to seconds (JWT expects seconds)
        const expiresInSeconds = Math.floor(expiresInMs / 1000);
        const token = jwt.sign(payload, secretKey, {
            expiresIn: expiresInSeconds,
        });
        return token;
    } else {
        // If parsing fails, pass the string directly (let jwt handle it)
        const token = jwt.sign(payload, secretKey, {
            expiresIn: expiresIn as jwt.SignOptions['expiresIn'],
        });
        return token;
    }
};

export default generateJWTToken;