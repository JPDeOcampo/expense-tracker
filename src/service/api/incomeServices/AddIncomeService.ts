import { ENDPOINTS } from "../../../../apiConfig";
import { IAddFormTypes } from "@/components/interface/global-interface";

export const AddIncomeService = async ({
  userId,
  date,
  amount,
  category,
  frequency,
  paymentMethod,
  note,
}: IAddFormTypes) => {
  try {
    const response = await fetch(ENDPOINTS.add_income, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reqUserId: userId,
        date: date,
        amount: amount,
        category: category,
        frequency: frequency,
        paymentMethod: paymentMethod,
        note: note,
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
