"use client";
import { useState, FormEvent } from "react";
import useShareContextHooks from "@/components/shared/hooks/context-hooks/share-state-hooks";
import GroupField from "@/components/shared/components/group-field";
import { registerService } from "@/service/api/registerService";
import { IoMdArrowRoundBack } from "react-icons/io";
import { EyeFilledIcon } from "../../../../public/images";
import { EyeSlashFilledIcon } from "../../../../public/images";
import { Spinner } from "@nextui-org/react";
import GenericToast from "@/components/shared/components/generic-toast";
import useGlobalHooks from "@/components/shared/hooks/global-hooks";
import { FocusStateType } from "@/components/interface/global-interface";

const Register = () => {
  const { shareContext } = useShareContextHooks();
  const {
    setIsCreateAccount,
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
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      reEnterPassword: formData.get("reEnterPassword") as string,
    };

    try {
      const response = await registerService(data);

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
        setIsCreateAccount(false);
        handleResetFormValues();
        updateToast({
          isToast: "alert-success",
          toastId: "alert-success",
          position: "top-center",
          delay: 4000,
          className: "toast-success",
          message: "Successfully created!",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 lg:p-8">
      <div className="w-full">
        <button
          className="flex gap-2 items-center text-quaternary hover:text-primary"
          onClick={() => setIsCreateAccount(false)}
        >
          <span className="text-xl">
            <IoMdArrowRoundBack />
          </span>
          <span className="text-base font-medium">Back</span>
        </button>
      </div>
      {isError.error === "register-error" && (
        <GenericToast isToast={'default'} message={isError.message} />
      )}
      <h2 className="text-2xl font-bold text-primary">Register</h2>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={handleSubmit}
      >
        <GroupField
          label="First Name"
          type="text"
          name="firstName"
          isRequired={true}
          isFocused={focusState.firstName}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
        />
        <GroupField
          label="Last Name"
          type="text"
          name="lastName"
          isRequired={true}
          isFocused={focusState.lastName}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
        />
        <GroupField
          label="Username"
          type="text"
          name="username"
          isRequired={true}
          isFocused={focusState.username}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
        />
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
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
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
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        </div>
        <div className="w-full mt-3">
          <button type="submit" className="custom-btn">
            Register
            {loading && <Spinner className="button-spinner" color="default" />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
