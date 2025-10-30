import { Document, Model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role :UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDocument> {
  findByCredentials(
    email: string,
    password: string
  ): Promise<IUserDocument | null>;
}
//Role types
export enum UserRole {
  SUPER_ADMIN = "super_admin",
  ADMIN ="admin",
  MANAGER = "manager",
  USER = "user",
  CUSTOMER= "customer"
}

 export const ROLE_HIRARCHY = {
  [UserRole.SUPER_ADMIN]:5,
  [UserRole.ADMIN]:4,
  [UserRole.MANAGER]:3,
  [UserRole.USER]:2,
  [UserRole.CUSTOMER]:1,
  
 }