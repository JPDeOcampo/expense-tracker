"use client";
import { useState, useContext } from "react";
import { ShareContext } from "@/components/shared/context/share-state";
import GroupField from "@/components/shared/components/group-field";
import { registerService } from "@/service/api/registerService";
import { IoMdArrowRoundBack } from "react-icons/io";
import { EyeFilledIcon } from "../../../../public/images";
import { EyeSlashFilledIcon } from "../../../../public/images";

const Register = () => {

  const { setIsCreateAccount, focusState, handleFocus, handleBlur } = useContext<any>(ShareContext);
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const [isVisibleReEnterPassword, setIsVisibleReEnterPassword] =
    useState<boolean>(false);
 

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
          <button
            type="submit"
            className="custom-btn"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
