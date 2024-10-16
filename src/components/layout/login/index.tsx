"use client";
import { useState, useContext } from "react";
import { ShareContext } from "@/components/shared/context/share-state";
import GroupField from "@/components/shared/components/group-field";
import { loginService } from "@/service/api/loginService";
import { useRouter } from "next/navigation";
import { EyeFilledIcon } from "../../../../public/images";
import { EyeSlashFilledIcon } from "../../../../public/images";
import { GlobalContext } from "@/components/shared/context/global-provider";
import { Spinner } from "@nextui-org/react";
import GenericToast from "@/components/shared/components/generic-toast";

const Login = () => {
  const {
    setIsCreateAccount,
    focusState,
    handleFocus,
    handleBlur,
    setFocusState,
    isError,
    setIsError,
  } = useContext<any>(ShareContext);
  const { fetchIncome } = useContext<any>(GlobalContext);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    setIsError((prev: any) => ({ ...prev, error: false }));
    setFocusState((prev: any) => {
      const resetState = Object.keys(prev).reduce((acc: any, key: any) => {
        acc[key] = false;
        return acc;
      }, {});

      return { ...resetState, focusState: true }; // or whatever you want to keep true
    });
    const formData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    try {
      const response = await loginService(formData);
      const data = await response?.json();

      if (response?.ok) {
        router.push("/pages/dashboard");
        fetchIncome();
        setLoading(false);
        setIsError((prev: any) => ({ ...prev, error: false }));
      } else {
        if (data.message === "Invalid Email") {
          setFocusState((prev: any) => ({ ...prev, errorEmailLogin: true }));
        } else {
          setFocusState((prev: any) => ({ ...prev, errorPasswordLogin: true }));
        }
        setLoading(false);
        setIsError((prev: any) => ({
          ...prev,
          error: true,
          message: data.message,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {isError.error && (
        <GenericToast defaultToast={true} message={isError.message} />
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
          <button
            className="absolute top-10 right-3 focus:outline-none"
            type="button"
            onClick={toggleVisibility}
            aria-label="toggle password visibility"
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        </div>

        <div className="w-full mt-3">
          <button type="submit" className="custom-btn">
            Login{" "}
            {loading && <Spinner className="button-spinner" color="default" />}
          </button>
        </div>
      </form>
      <button
        className="text-base font-medium text-quaternary hover:text-primary mt-4"
        onClick={() => setIsCreateAccount(true)}
      >
        Create Account
      </button>
    </div>
  );
};
export default Login;
