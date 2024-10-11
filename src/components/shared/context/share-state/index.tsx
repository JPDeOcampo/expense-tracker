"use client";
import { createContext, useState, useMemo, FC, ReactNode } from "react";

type ShareContextType = Record<string, any>;

export const ShareContext = createContext<ShareContextType | undefined>(
  undefined
);

const ShareState: FC<{ children: ReactNode }> = ({ children }) => {
  const [isCreateAccount, setIsCreateAccount] = useState<boolean>(false);
  
  const contextValue = useMemo(
    () => ({ isCreateAccount, setIsCreateAccount }),
    [isCreateAccount, setIsCreateAccount]
  );
  return (
    <ShareContext.Provider value={contextValue}>
      {children}
    </ShareContext.Provider>
  );
};

export default ShareState;
