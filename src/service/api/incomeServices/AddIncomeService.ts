import { ENDPOINTS } from "../../../../apiConfig";

interface IPropTypes {
  userId: string;
  date: string;
  amount: string;
  category: string;
  frequency: string;
  paymentMethod: string;
  note: string;
}

export const AddIncomeService = async ({
  userId,
  date,
  amount,
  category,
  frequency,
  paymentMethod,
  note,
}: IPropTypes) => {
  try {
    const response = await fetch(ENDPOINTS.add_income, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
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
