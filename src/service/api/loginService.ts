import { ENDPOINTS } from "../../../apiConfig";

export const loginService = async ({ email, password }: any) => {
  try {
    const response = await fetch(ENDPOINTS.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
