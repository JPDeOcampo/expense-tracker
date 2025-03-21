"use client";
import { useState, FormEvent } from "react";
import useShareContextHooks from "@/components/shared/hooks/context-hooks/share-state-hooks";
import GroupField from "@/components/shared/components/group-field";
import { forgotPasswordService } from "@/service/api/forgotPasswordService";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Spinner } from "@nextui-org/react";
import GenericToast from "@/components/shared/components/generic-toast";
import useGlobalHooks from "@/components/shared/hooks/global-hooks";
import { FocusStateType } from "@/components/interface/global-interface";

const ForgotPassword = () => {
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

  const [loading, setLoading] = useState<boolean>(false);

  const { handleResetFormValues, handleResetErrorFocus, handleSetError } =
    useGlobalHooks();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    handleResetErrorFocus();

    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email") as string,
    };

    try {
      const response = await forgotPasswordService(data);

      if (response?.invalidEmail) {
        setFocusState((prev: FocusStateType) => ({
          ...prev,
          errorEmailRegister: true,
        }));
        handleSetError("register-error", response?.message);
      } else if (response?.invalidPassword) {
        setFocusState((prev: FocusStateType) => ({
          ...prev,
          errorReEnterRegister: true,
        }));
        handleSetError("register-error", response?.message);
      } else {
        setIsLoginState("verify-token");
        handleResetFormValues();
        updateToast({
          isToast: "alert-success",
          toastId: "alert-success",
          position: "top-center",
          delay: 4000,
          className: "toast-success",
          message: "Email sent!",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 -mt-10">
      <div className="w-full">
        <button
          className="flex gap-2 items-center text-quaternary hover:text-primary"
          onClick={() => setIsLoginState("login")}
        >
          <span className="text-xl">
            <IoMdArrowRoundBack />
          </span>
          <span className="text-base font-medium">Back</span>
        </button>
      </div>
      {isError.error === "register-error" && (
        <GenericToast isToast={"default"} message={isError.message} />
      )}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-primary">Forgot Password</h2>
        <p className="text-quaternary">
          Please enter your registered email.
        </p>
      </div>

      <form className="grid gap-6" onSubmit={handleSubmit}>
        <GroupField
          label="Email"
          type="email"
          name="email"
          isRequired={true}
          isFocused={focusState.email}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          isEmailRegister={true}
        />

        <div className="w-full mt-3">
          <button type="submit" className="custom-btn">
            Submit
            {loading && <Spinner className="button-spinner" color="default" />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
