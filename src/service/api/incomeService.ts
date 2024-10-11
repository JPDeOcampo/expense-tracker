export const incomeService = async ({
  token,
  userId,
  date,
  amount,
  category,
  frequency,
  paymentMethod,
  note,
}: any) => {
  try {
    const response = await fetch("/api/dashboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: userId,
        date: date,
        amount: amount,
        category: category,
        frequency: frequency,
        paymentMethod: paymentMethod,
        note: note,
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
