import { ENDPOINTS } from "../../../../apiConfig";
import { ICombinedDataType } from "@/components/interface/global-interface";

export const updateExpenseService = async ({
  _id,
  date,
  amount,
  category,
  frequency,
  to,
  from,
  paymentMethod,
  note,
}: ICombinedDataType) => {
  try {
    const response = await fetch(ENDPOINTS.update_expense, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: _id,
        date: date,
        amount: amount,
        category: category,
        frequency: frequency,
        to: to,
        from: from,
        paymentMethod: paymentMethod,
        note: note,
      }),
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
