"use client";
import { useState, useContext } from "react";
import { ShareContext } from "../shared/context/share-state";
import GroupField from "../shared/components/group-field";
const Register = () => {
  const [isFirstNameFocus, setIsFirstNameFocus] = useState(false);
  const [isLastNameFocus, setIsLastNameFocus] = useState(false);
  const [isUsernameFocus, setIsUsernameFocus] = useState(false);
  const [isEmailFocus, setIsEmailFocus] = useState(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);
  const [isReEnterFocus, setIsReEnterFocus] = useState(false);

  const { setIsCreateAccount } = useContext<any>(ShareContext);
  return (
    <div className="flex flex-col gap-4">
      <button className="text-base" onClick={() => setIsCreateAccount(false)}>
        <span>{"<"}back</span>
      </button>
      <h2>Register</h2>

      <form className="grid grid-cols-2 gap-4">
        <GroupField
          label="First Name"
          type="text"
          name="firstName"
          isFocused={isFirstNameFocus}
          setIsFocused={setIsFirstNameFocus}
        />
        <GroupField
          label="Last Name"
          type="text"
          name="lastName"
          isFocused={isLastNameFocus}
          setIsFocused={setIsLastNameFocus}
        />
        <GroupField
          label="Username"
          type="text"
          name="username"
          isFocused={isUsernameFocus}
          setIsFocused={setIsUsernameFocus}
        />
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
        <GroupField
          label="Re-enter password"
          type="password"
          name="re-enter-password"
          isFocused={isReEnterFocus}
          setIsFocused={setIsReEnterFocus}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
