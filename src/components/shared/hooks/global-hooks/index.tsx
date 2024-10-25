"use client";
import useShareContextHooks from "../context-hooks/share-state-hooks";
import { FocusStateType } from "@/components/interface/global-interface";
import { useRouter } from "next/navigation";
import { logoutService } from "@/service/api/logoutService";
import toast from "react-hot-toast";

interface FocusState extends FocusStateType {
  [key: string]: boolean | undefined;
  focusState: boolean;
}
const useGlobalHooks = () => {
  const { shareContext } = useShareContextHooks();
  const { setFormValues, setIsError, setFocusState, currency, setIsMenuDrawer, isMenuDrawer } = shareContext;
  const router = useRouter();

  const handleResetFormValues = () => {
    setFormValues((prev: Record<string, string>) => {
      return Object.keys(prev).reduce(
        (acc: Record<string, string>, key: string) => {
          acc[key] = "";
          return acc;
        },
        {}
      );
    });
  };
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
      const resetState = Object.keys(prev as FocusState).reduce<FocusState>(
        (acc, key) => {
          acc[key] = false;
          return acc;
        },
        {} as FocusState
      );

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

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency ?? "USD",
  });

  const currencySymbol = formattedAmount
    .formatToParts(1)
    .find((part) => part.type === "currency")?.value;

  const handleLogout = async () => {
    try {
      const response = await logoutService();
      if (response?.ok) {
        router.push("/");
        sessionStorage.clear();
        toast.remove();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMenuClick = () => {
    setIsMenuDrawer(!isMenuDrawer);
  };

  return {
    handleResetFormValues,
    handleResetErrorFocus,
    handleSetError,
    handleFormatAmount,
    handleLogout,
    handleMenuClick,
    currencySymbol,
  };
};

export default useGlobalHooks;
