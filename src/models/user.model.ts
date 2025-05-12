import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../types/user';

// Define the User Schema
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, enum: ['student','teacher', 'admin'], default: 'student' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Pre-save middleware to hash the password before saving it
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash the password if it's modified
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to check password validity
userSchema.methods.isValidPassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

// Create a User model based on the schema
const User = model<IUser & Document>('User', userSchema);

export default User;
