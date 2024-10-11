"use client";
import { useState, useContext } from "react";
import { ShareContext } from "@/components/shared/context/share-state";
import GroupField from "@/components/shared/components/group-field";
import { registerService } from "@/service/api/registerService";
import { IoMdArrowRoundBack } from "react-icons/io";

const Register = () => {
  const [isFirstNameFocus, setIsFirstNameFocus] = useState(false);
  const [isLastNameFocus, setIsLastNameFocus] = useState(false);
  const [isUsernameFocus, setIsUsernameFocus] = useState(false);
  const [isEmailFocus, setIsEmailFocus] = useState(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);
  const [isReEnterFocus, setIsReEnterFocus] = useState(false);

  const { setIsCreateAccount } = useContext<any>(ShareContext);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (
      event.target.password.value !== event.target["re-enter-password"].value
    ) {
      return;
    }

    const formData = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };

    try {
      const response = await registerService(formData);
      console.log(response);
      if (response?.ok) {
        setIsCreateAccount(false);
      }
    } catch (error) {
      console.error(error);
    }
    console.log("Form Data:", formData);
  };

  return (
    <div className="flex flex-col gap-6 p-6 lg:p-8">
      <div className="w-full">
        <button className="flex gap-2 items-center text-quaternary hover:text-primary" onClick={() => setIsCreateAccount(false)}>
          <span className="text-xl"><IoMdArrowRoundBack /></span>
          <span className="text-base font-medium">Back</span>
        </button>
      </div>

      <h2 className="text-2xl font-bold text-primary">Register</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
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

        <div className="w-full mt-3">
          <button
            type="submit"
            className="text-base font-medium bg-primary hover:bg-primary-100 text-neutral-light py-2 px-4"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
