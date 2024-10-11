import { ENDPOINTS } from "../../../apiConfig";

export const dashboardService = async (token: any) => {
  try {
    const response = await fetch(ENDPOINTS.dashboard, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
