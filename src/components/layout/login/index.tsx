"use client";
import { useState, FormEvent } from "react";
import useShareContextHooks from "@/components/shared/hooks/context-hooks/share-state-hooks";
import GroupField from "@/components/shared/components/group-field";
import { loginService } from "@/service/api/loginService";
import { useRouter } from "next/navigation";
import { EyeFilledIcon } from "../../../../public/images";
import { EyeSlashFilledIcon } from "../../../../public/images";
import { Spinner } from "@nextui-org/react";
import GenericToast from "@/components/shared/components/generic-toast";
import useGlobalHooks from "@/components/shared/hooks/global-hooks";
import { FocusStateType } from "@/components/interface/global-interface";
import useGlobalContextHooks from "@/components/shared/hooks/context-hooks/global-context-hooks";

const Login = () => {
  const { shareContext } = useShareContextHooks();
  const { globalContext } = useGlobalContextHooks();
  const {
    setIsLoginState,
    focusState,
    handleFocus,
    handleBlur,
    setFocusState,
    isError,
  } = shareContext;
  const { fetchIncome, fetchUser } = globalContext;

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const { handleResetFormValues, handleResetErrorFocus, handleSetError } =
    useGlobalHooks();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    handleResetErrorFocus();
    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const response = await loginService(data);

      if (response?.invalidEmail) {
        setFocusState((prev: FocusStateType) => ({
          ...prev,
          errorEmailLogin: true,
        }));
        handleSetError("login-error", response?.message);
      } else if (response?.invalidPassword) {
        setFocusState((prev: FocusStateType) => ({
          ...prev,
          errorPasswordLogin: true,
        }));
        handleSetError("login-error", response?.message);
      } else {
        router.push("/pages/dashboard");
        fetchIncome(response?.id);
        fetchUser(response?.id);
        handleResetFormValues();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 h-[500px] justify-center lg:h-auto">
      {isError.error === "login-error" && (
        <GenericToast isToast={"default"} message={isError.message} />
      )}
      <h2 className="text-2xl font-bold text-primary">Login</h2>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <GroupField
          label="Email"
          type="email"
          name="email"
          value="emailLogin"
          isRequired={true}
          isFocused={focusState.email}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          isEmailLogin={true}
        />
        <div className="relative">
          <GroupField
            label="Password"
            type={isVisible ? "text" : "password"}
            name="password"
            value="emailPassword"
            isRequired={true}
            isFocused={focusState.password}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            hasIconEnd={true}
            isPasswordLogin={true}
          />
          <div>
            <button
              className="absolute top-10 right-3 focus:outline-none"
              type="button"
              onClick={toggleVisibility}
              aria-label="toggle password visibility"
            >
              {isVisible ? (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
            <a
              className="text-sm font-medium text-quaternary hover:text-primary mt-2 cursor-pointer"
              onClick={() => setIsLoginState("forgot-password")}
            >
              Forgot password?
            </a>
          </div>
        </div>

        <div className="w-full mt-3">
          <button type="submit" className="custom-btn" disabled={loading}>
            Login{" "}
            {loading && <Spinner className="button-spinner" color="default" />}
          </button>
        </div>
      </form>
      <button
        className="text-base font-medium text-quaternary hover:text-primary mt-4"
        onClick={() => setIsLoginState("create-account")}
        disabled={loading}
      >
        Create Account
      </button>
    </div>
  );
};
export default Login;
