import { ENDPOINTS } from "../../../apiConfig";
interface IPropTypes {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  reEnterPassword: string;
}
export const registerService = async ({
  firstName,
  lastName,
  email,
  username,
  password,
  reEnterPassword,
}: IPropTypes) => {
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
