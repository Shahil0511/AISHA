import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import type { IUserDocument, IUserModel } from "../../interfaces/IUser.js";

const SALT_ROUNDS = 10;

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
      select: false, // Hide password in queries by default
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// 🔐 Hash password before save
userSchema.pre<IUserDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔍 Compare password method
userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

// 🔎 Find user by credentials
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

// 🧹 Clean sensitive fields before returning
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

// ⚙️ Index for faster lookup
userSchema.index({ email: 1 }, { unique: true });

// ✅ Export model
const UserModel = mongoose.model<IUserDocument, IUserModel>("User", userSchema);
export default UserModel;
