import { ENDPOINTS } from "../../../../apiConfig";

export const fetchIncomeService = async () => {
  try {
    const response = await fetch(ENDPOINTS.fetch_income, {
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