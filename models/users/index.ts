import mongoose, { Schema, Document } from "mongoose";

export interface IUsers extends Document {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  sessionId: string;
  resetToken: string;
  resetTokenExpires: Date;
}

const UsersSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true }, 
  password: { type: String, required: true },
  sessionId: { type: String },
  resetToken: { type: String },
  resetTokenExpires: { type: Date },
});


const Users =
  mongoose.models.Users ||
  mongoose.model<IUsers>("Users", UsersSchema);

export default Users;
