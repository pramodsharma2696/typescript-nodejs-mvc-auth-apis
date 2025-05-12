
// User interface for the user data structure
export interface IUser {
  _id: Types.ObjectId | string;               
  email: string;                 
  password: string;              
  firstName: string;            
  lastName: string;             
  role: 'user' | 'teacher' | 'admin';
  createdAt: Date;               
  updatedAt: Date;               
}

export {};
// Extend Express's Request object with custom `user` property
declare global {
  namespace Express {
    interface Request {
      user?: IUser;               // Add a user property to the Request object
    }
  }
}
