import { ENDPOINTS } from "../../../../apiConfig";

interface IPropTypes {
  userId: string;
  date: string;
  amount: string;
  category: string;
  paymentMethod: string;
  note: string;
}


export const AddExpenseService = async ({
  userId,
  date,
  amount,
  category,
  paymentMethod,
  note,
}: any) => {
  try {
    const response = await fetch(ENDPOINTS.add_expense, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
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
