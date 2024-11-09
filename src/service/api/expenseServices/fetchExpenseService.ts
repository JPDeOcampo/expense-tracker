import { ENDPOINTS } from "../../../../apiConfig";

export const fetchExpenseService = async (userId: string) => {
  
  try {
    const response = await fetch(ENDPOINTS.fetch_expense, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      })
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};