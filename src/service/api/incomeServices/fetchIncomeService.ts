import { ENDPOINTS } from "../../../../apiConfig";

export const fetchIncomeService = async (userId: string) => {

  try {
    const response = await fetch(ENDPOINTS.fetch_income, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
