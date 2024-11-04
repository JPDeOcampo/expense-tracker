import { ENDPOINTS } from "../../../apiConfig";
export const logoutService = async (userId : string) => {
  try {
    const response = await fetch(ENDPOINTS.logout, {
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
    console.error("Error during logout:", error);
  }
};
