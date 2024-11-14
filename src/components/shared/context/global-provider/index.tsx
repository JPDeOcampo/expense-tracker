"use client";
import { createContext, useMemo, FC, ReactNode, useEffect } from "react";
import { fetchIncomeService } from "@/service/api/incomeServices/fetchIncomeService";
import { fetchExpenseService } from "@/service/api/expenseServices/fetchExpenseService";
import { usePathname } from "next/navigation";
import { fetchUserService } from "@/service/api/fetchUserService";
import useShareContextHooks from "../../hooks/context-hooks/share-state-hooks";

interface GlobalContextType {
  fetchIncome: (id: string) => Promise<Response | undefined>;
  fetchExpense: (id: string) => Promise<Response | undefined>;
  fetchUser: (id: number) => Promise<Response | undefined>;
}
export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

const GlobalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { shareContext } = useShareContextHooks();
  const { setIncomeData, setExpenseData, setUser } = shareContext;

  const pathname = usePathname();

  const fetchExpense = async (id: string): Promise<Response | undefined> => {
    try {
      const response = await fetchExpenseService(id);
      const data = await response?.json();
      if (response?.ok) {
        setExpenseData(data.expense);
        sessionStorage.setItem("expense", JSON.stringify(data.expense));

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

      if (data.invalidToken) return;

      if (response?.ok) {
        setIncomeData(data.income);
        sessionStorage.setItem("income", JSON.stringify(data.income));
        fetchExpense(id);

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

    setUser(user);
    setIncomeData(income);
    setExpenseData(expense);
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
