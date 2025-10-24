import mongoose, { Schema, type Document, type Model } from "mongoose";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export interface IUser {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
  toJSON(): Record<string, any>;
}

export interface IUserModel extends Model<IUserDocument> {
  findByCredentials(
    email: string,
    password: string
  ): Promise<IUserDocument | null>;
}

const userSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // don't return password
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre<IUserDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.statics.findByCredentials = async function (
  email: string,
  password: string
): Promise<IUserDocument | null> {
  const user = await this.findOne({ email }).select("+password").exec();
  if (!user) return null;
  const isMatch = await user.comparePassword(password);
  if (!isMatch) return null;
  return user;
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

userSchema.index({ email: 1 }, { unique: true });

const UserModel = mongoose.model<IUserDocument, IUserModel>("User", userSchema);
export default UserModel;
