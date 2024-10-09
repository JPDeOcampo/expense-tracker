"use client";
import { useState } from "react";
const Login = () => {
  const [isUsernameFocus, setIsUsernameFocus] = useState(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <h2>Login</h2>
      <form className="flex flex-col gap-4">
        <div className="group-input">
          <label>Usename</label>
          <input
            type="username"
            name="username"
            className={`${isUsernameFocus ? "border border-black" : "border border-secondary"}`}
            onFocus={(e) => setIsUsernameFocus(true)}
            onBlur={(e) => setIsUsernameFocus(false)}
          />
        </div>
        <div className="group-input">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className={`${isPasswordFocus ? "border border-black" : "border border-secondary"}`}
            onFocus={(e) => setIsPasswordFocus(true)}
            onBlur={(e) => setIsPasswordFocus(false)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default Login;
