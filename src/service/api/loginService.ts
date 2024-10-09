export async function login() {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "juan@gmail.com",
      password: "w",
    }),
  });
  console.log(response, 'll')
}
