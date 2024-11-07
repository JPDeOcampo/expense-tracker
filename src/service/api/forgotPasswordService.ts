import { ENDPOINTS } from "../../../apiConfig";

interface IPropTypes {
  email: string;
}

export const forgotPasswordService = async ({ email }: IPropTypes) => {

  try {
    const response = await fetch(ENDPOINTS.forgotPassword, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
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
