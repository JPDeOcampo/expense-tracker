import { ENDPOINTS } from "../../../apiConfig";
import { IUserTypes } from "@/components/interface/global-interface";

export const updateProfileService = async ({
  firstName,
  lastName,
  email,
  username,
}: IUserTypes) => {

  try {
    const response = await fetch(ENDPOINTS.updateProfile, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
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
