"use client";
import { useState, FormEvent } from "react";
import useShareContextHooks from "@/components/shared/hooks/context-hooks/share-state-hooks";
import GroupField from "@/components/shared/components/group-field";
import { verifyResetToken } from "@/service/api/verifyResetTokenService";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Spinner } from "@nextui-org/react";
import GenericToast from "@/components/shared/components/generic-toast";
import useGlobalHooks from "@/components/shared/hooks/global-hooks";
import { FocusStateType } from "@/components/interface/global-interface";

const ResetToken = () => {
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
      token: formData.get("code") as string,
    };

    try {
      const response = await verifyResetToken(data);

      if (response?.invalidCode) {
        setFocusState((prev: FocusStateType) => ({
          ...prev,
          errorEmailRegister: true,
        }));
        handleSetError("invalid-code", response?.message);
      } else {
        setIsLoginState("reset-password");
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
    <div className="flex flex-col gap-6 -mt-10 w-full max-w-96">
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
      {isError.error === "invalid-code" && (
        <GenericToast isToast={"default"} message={isError.message} />
      )}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-primary">Verify code</h2>
        <p className="text-quaternary">
          Please check your email inbox or spam folder for the verification code and enter it below.
        </p>
      </div>

      <form className="grid gap-6" onSubmit={handleSubmit}>
        <GroupField
          label="Verify code"
          type="input"
          name="code"
          isRequired={true}
          isFocused={focusState.email}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          isEmailRegister={true}
        />

        <div className="w-full mt-3">
          <button type="submit" className="custom-btn">
            Verify
            {loading && <Spinner className="button-spinner" color="default" />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetToken;
