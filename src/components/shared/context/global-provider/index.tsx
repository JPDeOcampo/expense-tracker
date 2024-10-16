"use client";
import {
  createContext,
  useContext,
  useState,
  useMemo,
  FC,
  ReactNode,
  useEffect,
} from "react";
import { ShareContext } from "../share-state";
import { fetchIncomeService } from "@/service/api/incomeServices/fetchIncomeService";
import { fetchExpenseService } from "@/service/api/expenseServices/fetchExpenseService";
import { usePathname } from "next/navigation";
import useTotalHooks from "../../hooks/total-hooks";

type GlobalContextType = Record<string, any>;

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

const GlobalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const {
    setIncomeData,
    setExpenseData,
    setOverAllIncomeData,
    setOverAllExpenseData,
    setCurrentBalance,
  } = useContext<any>(ShareContext);

  const { getTotalAmount } = useTotalHooks();

  const pathname = usePathname();
 
  const fetchExpense = async (currentBalance: any) => {
    console.log(currentBalance);
    try {
      const response = await fetchExpenseService();
      const data = await response?.json();
      if (response?.ok) {
        setExpenseData(data.expense);
        const overAllAmount = getTotalAmount(data.expense);
        setOverAllExpenseData(overAllAmount);
        if (typeof currentBalance === 'number' && overAllAmount !== undefined) {
          setCurrentBalance(currentBalance - overAllAmount);
        }
        return response;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchIncome = async () => {
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

  useEffect(() => {
    if (pathname === "/") return;
    fetchIncome();
  }, []);

  const contextValue = useMemo(
    () => ({ fetchIncome, fetchExpense }),
    [fetchIncome, fetchExpense]
  );
  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
