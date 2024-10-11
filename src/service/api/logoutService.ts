import { ENDPOINTS } from "../../../apiConfig";
export const logoutService = async () => {
  try {
    const response = await fetch(ENDPOINTS.logout, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error("Error during logout:", error);
  }
};
