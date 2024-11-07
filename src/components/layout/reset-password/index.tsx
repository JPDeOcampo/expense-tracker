"use client";
import { useState, FormEvent } from "react";
import useShareContextHooks from "@/components/shared/hooks/context-hooks/share-state-hooks";
import GroupField from "@/components/shared/components/group-field";
import { resetPasswordService } from "@/service/api/resetPasswordService";
import { IoMdArrowRoundBack } from "react-icons/io";
import { EyeFilledIcon } from "../../../../public/images";
import { EyeSlashFilledIcon } from "../../../../public/images";
import { Spinner } from "@nextui-org/react";
import GenericToast from "@/components/shared/components/generic-toast";
import useGlobalHooks from "@/components/shared/hooks/global-hooks";
import { FocusStateType } from "@/components/interface/global-interface";

const ResetPassword = () => {
  const { shareContext } = useShareContextHooks();
  const {
    setIsLoginState,
    focusState,
    handleFocus,
    handleBlur,
    setFocusState,
    isError,
    updateToast,
  } = shareContext;

  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const [isVisibleReEnterPassword, setIsVisibleReEnterPassword] =
    useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const { handleResetFormValues, handleResetErrorFocus, handleSetError } =
    useGlobalHooks();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    handleResetErrorFocus();

    const formData = new FormData(event.currentTarget);
    const data = {
      password: formData.get("password") as string,
      reEnterPassword: formData.get("reEnterPassword") as string,
    };

    try {
      const response = await resetPasswordService(data);

      if (response?.invalidPassword) {
        setFocusState((prev: FocusStateType) => ({
          ...prev,
          errorReEnterRegister: true,
        }));
        handleSetError("reenter-error", response?.message);
      } else {
        setIsLoginState("login");
        handleResetFormValues();
        updateToast({
          isToast: "alert-success",
          toastId: "alert-success",
          position: "top-center",
          delay: 4000,
          className: "toast-success",
          message: response?.message,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="w-full">
        <button
          className="flex gap-2 items-center text-quaternary hover:text-primary"
          onClick={() => setIsLoginState("forgot-password")}
        >
          <span className="text-xl">
            <IoMdArrowRoundBack />
          </span>
          <span className="text-base font-medium">Back</span>
        </button>
      </div>
      {isError.error === "reenter-error" && (
        <GenericToast isToast={"default"} message={isError.message} />
      )}
      <h2 className="text-2xl font-bold text-primary">Reset Password</h2>

      <form
        className="grid gap-6"
        onSubmit={handleSubmit}
      >
        <div className="relative">
          <GroupField
            label="Password"
            type={isVisiblePassword ? "text" : "password"}
            name="password"
            isRequired={true}
            isFocused={focusState.password}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            hasIconEnd={true}
          />
          <button
            className="absolute top-10 right-3 focus:outline-none"
            type="button"
            onClick={() => setIsVisiblePassword(!isVisiblePassword)}
            aria-label="toggle password visibility"
          >
            {isVisiblePassword ? (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        </div>
        <div className="relative">
          <GroupField
            label="Re-enter password"
            type={isVisibleReEnterPassword ? "text" : "password"}
            name="reEnterPassword"
            isRequired={true}
            isFocused={focusState.reEnterPassword}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            isReEnterRegister={true}
          />
          <button
            className="absolute top-10 right-3 focus:outline-none"
            type="button"
            onClick={() =>
              setIsVisibleReEnterPassword(!isVisibleReEnterPassword)
            }
            aria-label="toggle password visibility"
          >
            {isVisibleReEnterPassword ? (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        </div>
        <div className="w-full mt-3">
          <button type="submit" className="custom-btn">
            Reset Password
            {loading && <Spinner className="button-spinner" color="default" />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
