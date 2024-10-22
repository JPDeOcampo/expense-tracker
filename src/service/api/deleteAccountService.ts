import { ENDPOINTS } from "../../../apiConfig";
import { IUserTypes } from "@/components/interface/global-interface";

export const deleteAccountService = async ({
  password,
  reEnterPassword,
}: IUserTypes) => {

  try {
    const response = await fetch(ENDPOINTS.deleteAccount, {
      method: "DELETE",
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
