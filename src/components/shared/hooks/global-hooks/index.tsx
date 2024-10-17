"use client";
import { useContext } from "react";
import { ShareContext } from "../../context/share-state";

const useGlobalHooks = () => {
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
    setIsError((prev: any) => ({ ...prev, error: false }));
    setFocusState((prev: any) => {
      const resetState = Object.keys(prev).reduce((acc: any, key: any) => {
        acc[key] = false;
        return acc;
      }, {});

      return { ...resetState, focusState: true };
    });
  };

  const handleFormatAmount = (amount: any, currency: any) => {
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
