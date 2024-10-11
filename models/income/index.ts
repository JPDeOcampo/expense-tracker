import mongoose, { Schema, Document } from "mongoose";

export interface IIncome extends Document {
  userId: string;
  date: Date;
  amount: number;
  category: string;
  frequency: string;
  paymentMethod: string;
  note: string;
}

const IncomeSchema: Schema = new Schema({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  frequency: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  note: { type: String },
});

const Income =
  mongoose.models.Income || mongoose.model<IIncome>("Income", IncomeSchema);

export default Income;
