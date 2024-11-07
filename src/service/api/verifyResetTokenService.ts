import { ENDPOINTS } from "../../../apiConfig";

interface IPropTypes {
  token: string;
}

export const verifyResetToken = async ({ token }: IPropTypes) => {

  try {
    const response = await fetch(ENDPOINTS.resetToken, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
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
