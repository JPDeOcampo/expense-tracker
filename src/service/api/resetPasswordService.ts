import { ENDPOINTS } from "../../../apiConfig";

interface IPropTypes {
  password: string;
  reEnterPassword: string;
}

export const resetPasswordService = async ({ password, reEnterPassword } : IPropTypes) => {

  try {
    const response = await fetch(ENDPOINTS.resetPassword, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        reEnterPassword: reEnterPassword,
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
