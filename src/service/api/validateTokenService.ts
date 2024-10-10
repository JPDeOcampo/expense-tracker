export const validateTokenService = async (token: any) => {
  try {
    const response = await fetch("/api/validate-token", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
