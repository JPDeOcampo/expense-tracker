import { ENDPOINTS } from "../../../apiConfig";

export const registerService = async ({
  firstName,
  lastName,
  email,
  username,
  password,
}: any) => {
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
      }),
    });
    return response;
  } catch (error) {console.log(error)}
};
