"use client";
import useShareContextHooks from "../context-hooks/share-state-hooks";
import { FocusStateType } from "@/components/interface/global-interface";

interface FocusState extends FocusStateType {
  [key: string]: boolean;
  focusState: boolean;
}
const useGlobalHooks = () => {
  const { shareContext } = useShareContextHooks();
  const { setFormValues, setIsError, setFocusState } = shareContext;

  const handleResetFormValues = () => {
    setFormValues((prev: Record<string, string>) => {
      return Object.keys(prev).reduce((acc: Record<string, string>, key: string) => {
        acc[key] = "";
        return acc;
      }, {});
    });
  }
  const handleSetError = (error: string, message: string) => {
    setIsError({
      error: error,
      message: message,
    });
  };

  const handleResetErrorFocus = () => {
    setIsError({
      error: "",
      message: "",
    });
    setFocusState((prev: FocusStateType): FocusStateType => {
      const resetState = Object.keys(prev as FocusState).reduce<FocusState>((acc, key) => {
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
