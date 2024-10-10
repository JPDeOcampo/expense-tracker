"use client";
import { useState, useContext } from "react";
import { ShareContext } from "../shared/context/share-state";
const Login = () => {
  const [isUsernameFocus, setIsUsernameFocus] = useState<boolean>(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState<boolean>(false);
  const { setIsCreateAccount } = useContext<any>(ShareContext);
  
  return (
    <div className="flex flex-col gap-4">
      <h2>Login</h2>
      <form className="flex flex-col gap-4">
        <div className="group-input">
          <label>Usename</label>
          <input
            type="username"
            name="username"
            className={`${
              isUsernameFocus
                ? "border border-black"
                : "border border-secondary"
            }`}
            onFocus={(e) => setIsUsernameFocus(true)}
            onBlur={(e) => setIsUsernameFocus(false)}
          />
        </div>
        <div className="group-input">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className={`${
              isPasswordFocus
                ? "border border-black"
                : "border border-secondary"
            }`}
            onFocus={(e) => setIsPasswordFocus(true)}
            onBlur={(e) => setIsPasswordFocus(false)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <button className="text-base" onClick={()=> setIsCreateAccount(true)}>Create Account</button>
    </div>
  );
};
export default Login;
