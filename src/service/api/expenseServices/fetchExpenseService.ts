import { ENDPOINTS } from "../../../../apiConfig";

export const fetchExpenseService = async () => {
  try {
    const response = await fetch(ENDPOINTS.fetch_expense, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};