import { ENDPOINTS } from "../../../../apiConfig";
export const AddIncomeService = async ({
  token,
  userId,
  date,
  amount,
  category,
  frequency,
  paymentMethod,
  note,
}: any) => {
  try {
    const response = await fetch(ENDPOINTS.income, {
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
