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
    <div className="flex flex-col gap-4">
      <h2>Login</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <button className="text-base" onClick={() => setIsCreateAccount(true)}>
        Create Account
      </button>
    </div>
  );
};
export default Login;
