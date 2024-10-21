"use client";
import {
  createContext,
  useState,
  useMemo,
  FC,
  ReactNode,
  useEffect
} from "react";
import {
  ICombinedDataType,
  FocusStateType,
  ShareContextType
} from "@/components/interface/global-interface";
// type ShareContextType = Record<string, any>;


const initialFocusState: FocusStateType = {
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
};

export const ShareContext = createContext<ShareContextType | null>(null);

const ShareState: FC<{ children: ReactNode }> = ({ children }) => {
  const [isCreateAccount, setIsCreateAccount] = useState<boolean>(false);
  const [incomeData, setIncomeData] = useState<ICombinedDataType[]>([]);
  const [expenseData, setExpenseData] = useState<ICombinedDataType[]>([]);
  const [user, setUser] = useState<string | number>("");
  const [overAllIncomeData, setOverAllIncomeData] = useState<number>(0);
  const [currentBalance, setCurrentBalance] = useState<number | undefined>(0);
  const [overAllExpenseData, setOverAllExpenseData] = useState<number>(0);
  const [currency, setCurrency] = useState<string | null>("PHP");
  const [isError, setIsError] = useState<{ error: string; message: string }>({
    error: "",
    message: "",
  });
  const [focusState, setFocusState] =
    useState<FocusStateType>(initialFocusState);
  const [formValues, setFormValues] = useState<Record<string, string>>({
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

  // Textfield Focus
  const handleFocus = (field: string) => {
    setFocusState((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setFocusState((prev) => ({ ...prev, [field]: false }));
  };

  // Combine income and expense data
  const combinedData = useMemo(() => [
    ...(Array.isArray(incomeData)
      ? incomeData.map((event: ICombinedDataType) => ({
          ...event,
          type: "income",
        }))
      : []),
    ...(Array.isArray(expenseData)
      ? expenseData.map((event: ICombinedDataType) => ({
          ...event,
          type: "expense",
        }))
      : []),
  ], [incomeData, expenseData]);


console.log(combinedData, 'comb')
console.log(currentBalance)
console.log(incomeData, expenseData, 'kk')
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
      currency,
      setCurrency,
      user,
      setUser,
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
      currency,
      setCurrency,
      user,
      setUser,
    ]
  );
  return (
    <ShareContext.Provider value={contextValue}>
      {children}
    </ShareContext.Provider>
  );
};

export default ShareState;
