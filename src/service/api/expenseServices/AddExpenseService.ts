import { ENDPOINTS } from "../../../../apiConfig";
import { IAddFormTypes } from "@/components/interface/global-interface";

export const AddExpenseService = async ({
  // userId,
  date,
  amount,
  category,
  paymentMethod,
  note,
}: IAddFormTypes) => {
  try {
    const response = await fetch(ENDPOINTS.add_expense, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // userId: userId,
        date: date,
        amount: amount,
        category: category,
        paymentMethod: paymentMethod,
        note: note,
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
