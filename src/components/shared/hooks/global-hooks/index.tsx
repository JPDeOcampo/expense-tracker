"use client";
import { useContext } from "react";
import { ShareContext } from "../../context/share-state";

interface ErrorState {
  error: boolean;
}

interface FocusState {
  [key: string]: boolean;
  focusState: boolean; 
}
const useGlobalHooks = () => {
  // const {shareContext} = useContextHooks();
  const { setFormValues, setIsError, setFocusState } =
    useContext<any>(ShareContext);
  const handleResetFormValues = () => {
    setFormValues((prev: any) => {
      const newValues = Object.keys(prev).reduce((acc: any, key: any) => {
        acc[key] = "";
        return acc;
      }, {});
      return newValues;
    });
  };
  const handleSetError = (error: any, message: any) => {
    setIsError((prev: any) => ({
      ...prev,
      error: error,
      message: message,
    }));
  };
  
  const handleResetErrorFocus = () => {
    setIsError((prev: ErrorState) => ({ ...prev, error: false }));
    setFocusState((prev: FocusState) => {
        const resetState = Object.keys(prev).reduce<FocusState>((acc, key) => {
            acc[key] = false;
            return acc;
        }, {} as FocusState);

        return { ...resetState, focusState: true };
    });
};

  const handleFormatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return {
    handleResetFormValues,
    handleResetErrorFocus,
    handleSetError,
    handleFormatAmount,
  };
};

export default useGlobalHooks;
