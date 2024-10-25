import { ENDPOINTS } from "../../../../apiConfig";

export const deleteIncomeService = async (_id: string) => {
  try {
    const response = await fetch(ENDPOINTS.delete_income, {
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
