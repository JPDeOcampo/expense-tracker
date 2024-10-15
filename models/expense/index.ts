import mongoose, { Schema, Document } from "mongoose";

export interface IExpense extends Document {
  userId: string;
  date: Date;
  amount: number;
  category: string;
  paymentMethod: string;
  note: string;
}

const ExpenseSchema: Schema = new Schema({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  note: { type: String },
});

const Expense =
  mongoose.models.Expense || mongoose.model<IExpense>("Expense", ExpenseSchema);

export default Expense;
