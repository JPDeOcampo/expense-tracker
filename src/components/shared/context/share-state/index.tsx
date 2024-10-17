"use client";
import {
  createContext,
  useState,
  useMemo,
  FC,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import {
  ICombinedDataType,
  FocusStateType,
} from "@/components/interface/global-interface";
// type ShareContextType = Record<string, any>;

interface ShareContextType {
  isCreateAccount: boolean;
  setIsCreateAccount: (value: boolean) => void;
  focusState: FocusStateType;
  setFocusState: Dispatch<SetStateAction<FocusStateType>>;
  handleFocus: (field: string) => void;
  handleBlur: (field: string) => void;
  incomeData: ICombinedDataType[];
  setIncomeData: Dispatch<SetStateAction<ICombinedDataType[]>>;
  expenseData: ICombinedDataType[];
  setExpenseData: Dispatch<SetStateAction<ICombinedDataType[]>>;
  combinedData: ICombinedDataType[];
  overAllIncomeData: string | number;
  setOverAllIncomeData: (data: any) => void;
  currentBalance: number | undefined;
  setCurrentBalance: (balance: number) => void;
  overAllExpenseData: string | number;
  setOverAllExpenseData: (data: any) => void;
  isError: {
    error: string;
    message: string;
  };
  setIsError: (error: { error: string; message: string }) => void;
  formValues: Record<string, string>;
  setFormValues: Dispatch<SetStateAction<Record<string, string>>>;
  currency: string | null;
  setCurrency: (currency: string | null) => void;
  user: any;
  setUser: (user: string | number) => void;
}
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
// const defaultContextValue: ShareContextType = {
//   isCreateAccount: false,
//   setIsCreateAccount: () => {},
//   focusState: initialFocusState,
//   setFocusState: () => {},
//   handleFocus: () => {},
//   handleBlur: () => {},
//   incomeData: [],
//   setIncomeData: () => {},
//   expenseData: [],
//   setExpenseData: () => {},
//   combinedData: [],
//   overAllIncomeData: 0,
//   setOverAllIncomeData: () => {},
//   currentBalance: undefined,
//   setCurrentBalance: () => {},
//   overAllExpenseData: 0,
//   setOverAllExpenseData: () => {},
//   isError: { error: '', message: '' },
//   setIsError: () => {},
//   formValues: {},
//   setFormValues: () => {},
//   currency: null,
//   setCurrency: () => {},
//   user: '',
//   setUser: () => {},
// };

export const ShareContext = createContext<ShareContextType | null>(null);

const ShareState: FC<{ children: ReactNode }> = ({ children }) => {
  const [isCreateAccount, setIsCreateAccount] = useState<boolean>(false);
  const [incomeData, setIncomeData] = useState<ICombinedDataType[]>([]);
  const [expenseData, setExpenseData] = useState<ICombinedDataType[]>([]);
  const [user, setUser] = useState<any>("");
  const [overAllIncomeData, setOverAllIncomeData] = useState<any>(0);
  const [currentBalance, setCurrentBalance] = useState<number | undefined>(0);
  const [overAllExpenseData, setOverAllExpenseData] = useState<any>(0);
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
  const combinedData: ICombinedDataType[] = [
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
