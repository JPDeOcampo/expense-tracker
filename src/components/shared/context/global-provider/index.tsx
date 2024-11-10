"use client";
import {
  createContext,
  useMemo,
  FC,
  ReactNode,
  useEffect,
} from "react";
import { fetchIncomeService } from "@/service/api/incomeServices/fetchIncomeService";
import { fetchExpenseService } from "@/service/api/expenseServices/fetchExpenseService";
import { usePathname } from "next/navigation";
import useTotalHooks from "../../hooks/total-hooks";
import { fetchUserService } from "@/service/api/fetchUserService";
import useShareContextHooks from "../../hooks/context-hooks/share-state-hooks";

interface GlobalContextType {
  fetchIncome: (id: string) => Promise<Response | undefined>;
  fetchExpense: (currentBalance: number, id: string) => Promise<Response | undefined>;
  fetchUser: (id: number) => Promise<Response | undefined>;
}
export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

const GlobalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { shareContext } = useShareContextHooks();
  const {
    setIncomeData,
    setExpenseData,
    setOverAllIncomeData,
    setOverAllExpenseData,
    setCurrentBalance,
    setUser,
  } = shareContext;

  const { getTotalAmount } = useTotalHooks();

  const pathname = usePathname();

  const fetchExpense = async (
    currentBalance: number,
    id: string,
  ): Promise<Response | undefined> => {
    try {
      const response = await fetchExpenseService(id);
      const data = await response?.json();
      if (response?.ok) {
        setExpenseData(data.expense);
        sessionStorage.setItem("expense", JSON.stringify(data.expense));
        const overAllAmount = getTotalAmount(data.expense);
        setOverAllExpenseData(overAllAmount);
        sessionStorage.setItem("overAllExpense", JSON.stringify(overAllAmount));
        if (typeof currentBalance === "number" && overAllAmount !== undefined) {
          setCurrentBalance(currentBalance - overAllAmount);
          sessionStorage.setItem(
            "currentBalance",
            JSON.stringify(currentBalance - overAllAmount)
          );
        }
        return response;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchIncome = async (id: string): Promise<Response | undefined> => {
    try {
      const response = await fetchIncomeService(id);
      const data = await response?.json();
      if (response?.ok) {
        setIncomeData(data.income);

        const overAllAmount = getTotalAmount(data.income);

        setOverAllIncomeData(overAllAmount);
        setCurrentBalance(overAllAmount);

        fetchExpense(overAllAmount, id);

        sessionStorage.setItem("income", JSON.stringify(data.income));
        sessionStorage.setItem("overAllIncome", JSON.stringify(overAllAmount));
        return response;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUser = async (id: number): Promise<Response | undefined> => {
    try {
      const response = await fetchUserService(id);
      sessionStorage.setItem("user", JSON.stringify(response.login));
      setUser(response.login);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (pathname === "/") return;

    const income = JSON.parse(sessionStorage.getItem("income") ?? "null");
    const expense = JSON.parse(sessionStorage.getItem("expense") ?? "null");
    const user = JSON.parse(sessionStorage.getItem("user") ?? "null");
    const currentBalance = JSON.parse(
      sessionStorage.getItem("currentBalance") ?? "null"
    );
    const overAllIncome = JSON.parse(
      sessionStorage.getItem("overAllIncome") ?? "null"
    );
    const overAllExpense = JSON.parse(
      sessionStorage.getItem("overAllExpense") ?? "null"
    );

    setUser(user);
    setIncomeData(income);
    setExpenseData(expense);

    setOverAllIncomeData(overAllIncome);
    setOverAllExpenseData(overAllExpense);
    setCurrentBalance(currentBalance);
  }, []);

  const contextValue = useMemo(
    () => ({ fetchIncome, fetchExpense, fetchUser }),
    [fetchIncome, fetchExpense, fetchUser]
  );

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
