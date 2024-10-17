export interface IMainData {
  amount: number | string;
  date: string;
  note: string;
  paymentMethod: string;
  userId: string;
  _id: string;
  __v: number;
}
export interface ICategoryDataType extends IMainData {
  category: string;
}

export interface IFrequencyDataType extends ICategoryDataType {
  frequency: string;
}

export interface ICombinedDataType extends IFrequencyDataType {
  type: string;
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
}

export interface ShareContextType {
  combinedData: ICombinedDataType[] | [];
  currency: null;
  overAllIncomeData: number | string;
  currentBalance: number | string;
  overAllExpenseData: number | string;
  isCreateAccount: boolean;

  //   setIsCreateAccount: (value: boolean) => void;
  //   focusState: any; // Replace with the actual type
  //   setFocusState: (value: any) => void; // Replace with the actual type
  //   handleFocus: () => void;
  //   handleBlur: () => void;
  //   incomeData: any[]; // Replace with the actual type
  //   setIncomeData: (data: any[]) => void; // Replace with the actual type
  //   expenseData: any[]; // Replace with the actual type
  //   setExpenseData: (data: any[]) => void; // Replace with the actual type
  //   setCurrentBalance: (balance: number) => void;
  //   isError: boolean;
  //   setIsError: (error: boolean) => void;
  //   formValues: Record<string, any>; // Replace with the actual type
  //   setFormValues: (values: Record<string, any>) => void; // Replace with the actual type

  //   setCurrency: (currency: string) => void;
  //   user: any; // Replace with the actual type
  //   setUser: (user: any) => void; // Replace with the actual type
  setIsCreateAccount: (value: boolean) => void;
  focusState: FocusStateType;
  setFocusState: (state: FocusStateType) => void;
  handleFocus: (field: string) => void;
  handleBlur: (field: string) => void;
  incomeData: ICombinedDataType[];
  setIncomeData: (data: ICombinedDataType[]) => void;
  expenseData: ICombinedDataType[];
  setExpenseData: (data: ICombinedDataType[]) => void;
  setOverAllIncomeData: (data: any) => void;
  setCurrentBalance: (balance: number) => void;
  setOverAllExpenseData: (data: any) => void;
  isError: {
    error: string;
    message: string;
  };
  setIsError: (error: { error: string; message: string }) => void;
  formValues: Record<string, string>;
  setFormValues: (values: Record<string, string>) => void;
  setCurrency: (currency: string | null) => void;
  user: any;
  setUser: (user: any) => void;
}
