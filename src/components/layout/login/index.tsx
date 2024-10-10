"use client";
import { useState, useContext } from "react";
import { ShareContext } from "../shared/context/share-state";
import GroupField from "../shared/components/group-field";
import { loginService } from "@/service/api/loginService";
import { useRouter } from "next/navigation";
const Login = () => {
  const [isEmailFocus, setIsEmailFocus] = useState<boolean>(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState<boolean>(false);
  const { setIsCreateAccount } = useContext<any>(ShareContext);
  const router = useRouter();
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    console.log(formData);
    try {
      const response = await loginService(formData);
      if (response?.ok) {
        router.push("/pages/dashboard");
        alert(response);
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
