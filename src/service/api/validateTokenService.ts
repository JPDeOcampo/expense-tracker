import { ENDPOINTS } from "../../../apiConfig";

export const validateTokenService = async (token: any) => {
  try {
    const response = await fetch(ENDPOINTS.validateToken, {
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
