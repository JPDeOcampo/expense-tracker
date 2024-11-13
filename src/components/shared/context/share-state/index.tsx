"use client";
import {
  createContext,
  useState,
  useMemo,
  FC,
  ReactNode,
  useEffect,
} from "react";
import {
  ICombinedDataType,
  FocusStateType,
  ShareContextType,
  ITransaction,
} from "@/components/interface/global-interface";
import GenericToast from "../../components/generic-toast";
import { IToastTypes } from "@/components/interface/global-interface";
import toast from "react-hot-toast";
import { IUserTypes } from "@/components/interface/global-interface";
import useTotalHooks from "../../hooks/total-hooks";
import type { Selection } from "@nextui-org/react";

const initialFocusState: FocusStateType = {
  firstName: false,
  lastName: false,
  username: false,
  email: false,
  password: false,
  newPassword: false,
  reEnterPassword: false,
  date: false,
  amount: false,
  category: false,
  frequency: false,
  paymentMethod: false,
  note: false,
  to: false,
  from: false,
  errorEmailLogin: false,
  errorPasswordLogin: false,
  errorEmailRegister: false,
  errorReEnterRegister: false,
  errorReEnterPassword: false,
  errorPassword: false,
  errorAmount: false,
  errorCategory: false,
  errorFrequency: false,
  errorPaymentMethod: false,
};

export const ShareContext = createContext<ShareContextType | null>(null);

const ShareState: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoginState, setIsLoginState] = useState<string | null>("login");
  const [isMenuDrawer, setIsMenuDrawer] = useState<boolean>(false);
  const [incomeData, setIncomeData] = useState<ICombinedDataType[]>([]);
  const [expenseData, setExpenseData] = useState<ICombinedDataType[]>([]);
  const [user, setUser] = useState<IUserTypes[]>([]);
  const [overAllIncomeData, setOverAllIncomeData] = useState<number>(0);
  const [currentBalance, setCurrentBalance] = useState<number | undefined>(0);
  const [overAllExpenseData, setOverAllExpenseData] = useState<number>(0);
  const [currency, setCurrency] = useState<string | null>("USD");
  const [selectedTabs, setSelectedTabs] = useState<string | null>("expense");
  const [isGenericModal, setIsGenericModal] = useState<string | null>("");
  const [modalHeader, setModalHeader] = useState<string | null>("");
  const [isSelectedList, setIsSelectedList] = useState<{
    type: string;
    category: string;
  }>({ type: "", category: "" });
  const [isError, setIsError] = useState<{ error: string; message: string }>({
    error: "",
    message: "",
  });
  const [filterYear, setFilterYear] = useState<string | number>("All");
  const [focusState, setFocusState] =
    useState<FocusStateType>(initialFocusState);

  const [formValues, setFormValues] = useState<Record<string, string>>({
    firstName: "",
    lastName: "",
    username: "",
    emailLogin: "",
    passwordLogin: "",
    passwordRegister: "",
    oldPassword: "",
    newPassword: "",
    reEnterPassword: "",
    date: "",
    amount: "",
    category: "",
    frequency: "",
    paymentMethod: "",
    note: "",
    to: "",
    from: "",
  });
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(["All"]));
  const { getTotalAmount } = useTotalHooks();

  // Textfield Focus
  const handleFocus = (field: string) => {
    setFocusState((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setFocusState((prev) => ({ ...prev, [field]: false }));
  };

  // Combine income and expense data
  const defaultCombinedData = useMemo(
    () => [
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
    ],
    [incomeData, expenseData, filterYear]
  );

  const combinedData = useMemo(
    () => [
      ...(Array.isArray(incomeData)
        ? incomeData
            .filter((entry: ICombinedDataType) => {
              const entryDate = new Date(entry.date);
              if (filterYear === String("All") || filterYear === "")
                return true;
              return entryDate.getFullYear() === Number(filterYear);
            })
            .map((event: ICombinedDataType) => ({
              ...event,
              type: "income",
            }))
        : []),
      ...(Array.isArray(expenseData)
        ? expenseData
            .filter((entry: ICombinedDataType) => {
              const entryDate = new Date(entry.date);
              if (filterYear === String("All") || filterYear === "")
                return true;
              return entryDate.getFullYear() === Number(filterYear);
            })
            .map((event: ICombinedDataType) => ({
              ...event,
              type: "expense",
            }))
        : []),
    ],
    [defaultCombinedData]
  );

  const calculateBalance = (
    overAllIncomeAmount: number,
    overAllExpenseAmount: number
  ) => {
    if (
      typeof currentBalance === "number" &&
      overAllExpenseAmount !== undefined
    ) {
      setCurrentBalance(overAllIncomeAmount - overAllExpenseAmount);
    }
  };
  useEffect(() => {
    const overAllIncomeAmount = getTotalAmount(incomeData as ITransaction[]);
    const overAllExpenseAmount = getTotalAmount(expenseData as ITransaction[]);
    setOverAllIncomeData(overAllIncomeAmount);
    setOverAllExpenseData(overAllExpenseAmount);
    calculateBalance(overAllIncomeAmount, overAllExpenseAmount);
  }, [combinedData]);

  const updateToast = ({
    isToast,
    toastId,
    position,
    delay,
    className,
    message,
  }: IToastTypes) => {
    toast(<GenericToast isToast={isToast} message={message} />, {
      position: position,
      duration: delay,
      className: `toast ${className}`,
      id: toastId,
    });
  };

  const contextValue = useMemo(
    () => ({
      isLoginState,
      setIsLoginState,
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
      updateToast,
      selectedTabs,
      setSelectedTabs,
      isGenericModal,
      setIsGenericModal,
      modalHeader,
      setModalHeader,
      isMenuDrawer,
      setIsMenuDrawer,
      isSelectedList,
      setIsSelectedList,
      filterYear,
      setFilterYear,
      defaultCombinedData,
      selectedKeys,
      setSelectedKeys,
    }),
    [
      isLoginState,
      setIsLoginState,
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
      updateToast,
      selectedTabs,
      setSelectedTabs,
      isGenericModal,
      setIsGenericModal,
      modalHeader,
      setModalHeader,
      isMenuDrawer,
      setIsMenuDrawer,
      isSelectedList,
      setIsSelectedList,
      filterYear,
      setFilterYear,
      defaultCombinedData,
      selectedKeys,
      setSelectedKeys,
    ]
  );
  return (
    <ShareContext.Provider value={contextValue}>
      {children}
    </ShareContext.Provider>
  );
};

export default ShareState;
