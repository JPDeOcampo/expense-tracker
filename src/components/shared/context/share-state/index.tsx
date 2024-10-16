"use client";
import { error } from "console";
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

  const [isError, setIsError] = useState({
    error: "",
    message: "",
  });

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    emailLogin: "",
    passwordLogin: "",
    passwordRegister: "",
    reEnterPassword: "",
    date: "",
    amount: "",
    category: "",
    frequency: "",
    paymentMethod: "",
    note: "",
  });

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
    errorEmailLogin: false,
    errorPasswordLogin: false,
    errorEmailRegister: false,
    errorReEnterRegister: false,
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
      isError,
      setIsError,
      formValues,
      setFormValues,
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
      currentBalance,
      setCurrentBalance,
      overAllExpenseData,
      setOverAllExpenseData,
      isError,
      setIsError,
      formValues,
      setFormValues,
    ]
  );
  return (
    <ShareContext.Provider value={contextValue}>
      {children}
    </ShareContext.Provider>
  );
};

export default ShareState;
