import { ITransaction } from "@/components/interface/global-interface";
const useTotalHooks = () => {
  const getTotalAmount = (transactions: ITransaction[]): number => {
    return transactions.reduce(
      (sum, transaction) => sum +  Number(transaction.amount),
      0
    );
  };
  return {
    getTotalAmount,
  };
};

export default useTotalHooks;
