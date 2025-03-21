import { ENDPOINTS } from "../../../apiConfig";
import { IUserTypes } from "@/components/interface/global-interface";

export const registerService = async ({
  firstName,
  lastName,
  email,
  username,
  password,
  reEnterPassword,
}: IUserTypes) => {
  try {
    const response = await fetch(ENDPOINTS.register, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
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
