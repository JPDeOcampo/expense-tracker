import { ENDPOINTS } from "../../../apiConfig";

export const fetchUserService = async (id: number) => {
  
  try {
    const response = await fetch(`${ENDPOINTS.login}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};
