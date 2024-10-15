export interface Transaction {
  _id: string;
  userId: string;
  date: string;
  amount: number;
  category: string;
  frequency: string;
  paymentMethod: string;
  note: string;
  __v: number;
}
const useTotalHooks = () => {
  const getTotalAmount = (transactions: Transaction[]): number => {
    return transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
  };
  return {
    getTotalAmount,
  };
};

export default useTotalHooks;
