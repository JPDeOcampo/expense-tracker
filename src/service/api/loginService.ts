import { ENDPOINTS } from "../../../apiConfig";

interface IPropTypes {
  email: string;
  password: string;
}

export const loginService = async ({ email, password }: IPropTypes) => {

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
