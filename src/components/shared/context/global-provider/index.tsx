"use client";
import {
  createContext,
  useMemo,
  FC,
  ReactNode,
  useEffect,
  useContext
} from "react";
import { fetchIncomeService } from "@/service/api/incomeServices/fetchIncomeService";
import { fetchExpenseService } from "@/service/api/expenseServices/fetchExpenseService";
import { usePathname } from "next/navigation";
import useTotalHooks from "../../hooks/total-hooks";
import { fetchUserService } from "@/service/api/fetchUserService";
import useShareContextHooks from "../../hooks/context-hooks/share-state-hooks";

interface GlobalContextType {
  fetchIncome: () => Promise<Response | undefined>;
  fetchExpense: (currentBalance: number) => Promise<Response | undefined>;
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
    currentBalance: number
  ): Promise<Response | undefined> => {
    try {
      const response = await fetchExpenseService();
      const data = await response?.json();
      if (response?.ok) {
        setExpenseData(data.expense);
        const overAllAmount = getTotalAmount(data.expense);
        setOverAllExpenseData(overAllAmount);
        if (typeof currentBalance === "number" && overAllAmount !== undefined) {
          setCurrentBalance(currentBalance - overAllAmount);
        }
        return response;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchIncome = async (): Promise<Response | undefined> => {
    try {
      const response = await fetchIncomeService();
      const data = await response?.json();
      if (response?.ok) {
        setIncomeData(data.income);
        const overAllAmount = getTotalAmount(data.income);
        setOverAllIncomeData(overAllAmount);
        setCurrentBalance(overAllAmount);
        fetchExpense(overAllAmount);
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
    fetchIncome();
    const user = JSON.parse(sessionStorage.getItem("user") ?? "null");
    setUser(user);
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
