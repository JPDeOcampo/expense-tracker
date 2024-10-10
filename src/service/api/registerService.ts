interface LoginParams {
  firstName: string;
  lastName: string;
  email: string; // Add more fields as needed
  password: string;
}
export const registerService = async ({
  firstName,
  lastName,
  email,
  username,
  password,
}: any) => {
  try {
    const response = await fetch("/api/register", {
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
