"use client";
import { useState } from "react";
import useShareContextHooks from "../context-hooks/share-state-hooks";
import { FocusStateType } from "@/components/interface/global-interface";
import { useRouter } from "next/navigation";
import { logoutService } from "@/service/api/logoutService";
import toast from "react-hot-toast";
import { IEventExtendedProps } from "@/components/interface/global-interface";

interface FocusState extends FocusStateType {
  [key: string]: boolean | undefined;
  focusState: boolean;
}
const useGlobalHooks = () => {
  const { shareContext } = useShareContextHooks();
  const {
    setFormValues,
    setIsError,
    setFocusState,
    currency,
    setIsMenuDrawer,
    isMenuDrawer,
    setIsGenericModal,
    setSelectedTabs,
    setModalHeader,
    user,
  } = shareContext;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<IEventExtendedProps>();

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
      const response = await logoutService((user as { _id: string })._id);
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

  const handleEdit = (type: string, data: IEventExtendedProps) => {
    setIsModalOpen(true);
    setSelectedTabs(type);
    setUpdateData(data);
    setIsGenericModal?.("add-item");
    setModalHeader?.("Update");
  };

  const handleDelete = (type: string, data: IEventExtendedProps) => {
    const updatedData = {
      ...data,
      amount: handleFormatAmount(Number(data.amount), String(currency)),
      date: new Date(data.date ?? "").toISOString().split("T")[0],
    };

    setUpdateData(updatedData);
    setIsModalOpen(true);
    setIsGenericModal?.("delete-item");
    setModalHeader?.(`Delete ${type}`);
  };

  const capitalizeFirstLetter = (string: string) => {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return {
    handleResetFormValues,
    handleResetErrorFocus,
    handleSetError,
    handleFormatAmount,
    handleLogout,
    handleMenuClick,
    currencySymbol,
    isModalOpen,
    updateData,
    setIsModalOpen,
    handleDelete,
    handleEdit,
    capitalizeFirstLetter,
  };
};

export default useGlobalHooks;
