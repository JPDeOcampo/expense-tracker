import { ENDPOINTS } from "../../../../apiConfig";

export const deleteExpenseService = async (_id: string) => {
  try {
    const response = await fetch(ENDPOINTS.delete_expense, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: _id,
      }),
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
