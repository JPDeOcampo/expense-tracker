"use client";
import { createContext, useState, useMemo, FC, ReactNode } from "react";

type ShareContextType = Record<string, any>;

export const ShareContext = createContext<ShareContextType | undefined>(
  undefined
);

const ShareState: FC<{ children: ReactNode }> = ({ children }) => {
  const [isCreateAccount, setIsCreateAccount] = useState<boolean>(false);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  const [overAllIncomeData, setOverAllIncomeData] = useState();
  const [currentBalance, setCurrentBalance] = useState();
  const [overAllExpenseData, setOverAllExpenseData] = useState();
  console.log(incomeData, expenseData);

  const [focusState, setFocusState] = useState({
    firstName: false,
    lastName: false,
    username: false,
    email: false,
    password: false,
    reEnterPassword: false,
    date: false,
    amount: false,
    category: false,
    frequency: false,
    paymentMethod: false,
    note: false,
  });

  // Textfield Focus
  const handleFocus = (field: string) => {
    setFocusState((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setFocusState((prev) => ({ ...prev, [field]: false }));
  };

  // Combine income and expense data
  const combinedData = [
    ...(Array.isArray(incomeData)
      ? incomeData.map((event: any) => ({ ...event, type: "income" }))
      : []),
    ...(Array.isArray(expenseData)
      ? expenseData.map((event: any) => ({ ...event, type: "expense" }))
      : []),
  ];

  const contextValue = useMemo(
    () => ({
      isCreateAccount,
      setIsCreateAccount,
      focusState,
      setFocusState,
      handleFocus,
      handleBlur,
      incomeData,
      setIncomeData,
      expenseData,
      setExpenseData,
      combinedData,
      overAllIncomeData,
      setOverAllIncomeData,
      currentBalance,
      setCurrentBalance,
      overAllExpenseData,
      setOverAllExpenseData,
    }),
    [
      isCreateAccount,
      setIsCreateAccount,
      focusState,
      setFocusState,
      handleFocus,
      handleBlur,
      incomeData,
      setIncomeData,
      expenseData,
      setExpenseData,
      combinedData,
      overAllExpenseData,
      setOverAllExpenseData,
    ]
  );
  return (
    <ShareContext.Provider value={contextValue}>
      {children}
    </ShareContext.Provider>
  );
};

export default ShareState;
