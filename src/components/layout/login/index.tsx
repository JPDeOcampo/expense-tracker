"use client";
import { useState, useContext } from "react";
import { ShareContext } from "../shared/context/share-state";
import GroupField from "../shared/components/group-field";
import { loginService } from "@/service/api/loginService";
import { useRouter } from "next/navigation";
import { dashboardService } from "@/service/api/dashboardService";

const Login = () => {
  const [isEmailFocus, setIsEmailFocus] = useState<boolean>(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState<boolean>(false);
  const { setIsCreateAccount } = useContext<any>(ShareContext);
  const router = useRouter();

  const getDashboard = async (token: any) => {
    try {
      const response = await dashboardService(token);
      if (response?.ok) {
        router.push("/pages/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    try {
      const response = await loginService(formData);
      const responseData = await response?.json();

      if (response?.ok) {
        getDashboard(responseData?.token);
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <h2 className="text-2xl font-bold text-primary">Login</h2>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <GroupField
          label="Email"
          type="email"
          name="email"
          isFocused={isEmailFocus}
          setIsFocused={setIsEmailFocus}
        />
        <GroupField
          label="Password"
          type="password"
          name="password"
          isFocused={isPasswordFocus}
          setIsFocused={setIsPasswordFocus}
        />
        <div className="w-full mt-3">
          <button
            type="submit"
            className="text-base font-medium bg-primary hover:bg-primary-100 text-neutral-light py-2 px-4"
          >
            Login
          </button>
        </div>
      </form>
      <button className="text-base font-medium text-quaternary hover:text-primary mt-4" onClick={() => setIsCreateAccount(true)}>
        Create Account
      </button>
    </div>
  );
};
export default Login;
