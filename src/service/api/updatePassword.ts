import { ENDPOINTS } from "../../../apiConfig";
import { IUserTypes } from "@/components/interface/global-interface";

export const updatePasswordService = async ({
  oldPassword,
  newPassword,
  reEnterPassword,
}: IUserTypes) => {

  try {
    const response = await fetch(ENDPOINTS.updatePassword, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldPassword: oldPassword,
        newPassword: newPassword,
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
