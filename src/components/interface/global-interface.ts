import { Dispatch, SetStateAction } from "react";
export interface IMainData {
  amount: number | string;
  date: string;
  note: string;
  paymentMethod: string;
  userId: string;
  _id?: string;
  __v?: number;
}
export interface ICategoryDataType extends IMainData {
  category: string;
}

export interface IFrequencyDataType extends ICategoryDataType {
  frequency: string;
}

export interface ICombinedDataType extends IFrequencyDataType {
  [key: string]: string | number | undefined;
  type?: string;
  to?: string;
  from?: string;
  createdAt?: string | undefined;
}
export interface ITableDataType extends ICombinedDataType {
  [key: string]: string | number | undefined;
}
export interface FocusStateType {
  firstName: boolean;
  lastName: boolean;
  username: boolean;
  email: boolean;
  password: boolean;
  reEnterPassword: boolean;
  date: boolean;
  amount: boolean;
  category: boolean;
  frequency: boolean;
  paymentMethod: boolean;
  note: boolean;
  errorEmailLogin: boolean;
  errorPasswordLogin: boolean;
  errorEmailRegister: boolean;
  errorReEnterRegister: boolean;
  focusState?: boolean;
}
export interface IFieldValueTypes {
  firstName: string;
  lastName: string;
  username: string;
  emailLogin: string;
  passwordLogin: string;
  passwordRegister: string;
  reEnterPassword: string;
  date: string;
  amount: string;
  category: string;
  frequency: string;
  paymentMethod: string;
  note: string;
}
export interface ShareContextType {
  combinedData: ICombinedDataType[] | [];
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
  overAllIncomeData: string | number;
  setOverAllIncomeData: (data: number) => void;
  currentBalance: number | undefined;
  setCurrentBalance: (balance: number) => void;
  overAllExpenseData: string | number;
  setOverAllExpenseData: (data: number) => void;
  isError: {
    error: string;
    message: string;
  };
  setIsError: (error: { error: string; message: string }) => void;
  formValues: Record<string, string>;
  setFormValues: Dispatch<SetStateAction<Record<string, string>>>;
  currency: string | null;
  setCurrency: (currency: string | null) => void;
  user: { firstName: string } | (string | number);
  setUser: (user: string | number) => void;
}

// Income, Expense, and Transfer
export interface IAddFormTypes {
  date: string;
  amount: string | number;
  note: string;
  frequency?: string;
  category?: string | undefined;
  paymentMethod?: string;
  to?: string;
  from?: string;
}

export interface ITransaction {
  _id: string | number;
  userId: string;
  date: string;
  amount: number;
  category: string;
  frequency: string;
  paymentMethod: string;
  note: string;
  __v: number;
  createdAt?: string;
}