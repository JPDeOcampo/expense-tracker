"use client";
import { createContext, useState, useMemo, FC, ReactNode } from "react";

type ShareContextType = Record<string, any>;

export const ShareContext = createContext<ShareContextType | undefined>(
  undefined
);

const ShareState: FC<{ children: ReactNode }> = ({ children }) => {
  const [isCreateAccount, setIsCreateAccount] = useState<boolean>(false);

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

  const handleFocus = (field: string) => {
    setFocusState((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setFocusState((prev) => ({ ...prev, [field]: false }));
  };

  const contextValue = useMemo(
    () => ({
      isCreateAccount,
      setIsCreateAccount,
      focusState,
      setFocusState,
      handleFocus,
      handleBlur,
    }),
    [
      isCreateAccount,
      setIsCreateAccount,
      focusState,
      setFocusState,
      handleFocus,
      handleBlur,
    ]
  );
  return (
    <ShareContext.Provider value={contextValue}>
      {children}
    </ShareContext.Provider>
  );
};

export default ShareState;
