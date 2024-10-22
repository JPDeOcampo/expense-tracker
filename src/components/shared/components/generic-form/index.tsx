"use client";
import React from "react";
import { useState } from "react";
import useShareContextHooks from "@/components/shared/hooks/context-hooks/share-state-hooks";
import GroupField from "../group-field";
import { EyeFilledIcon } from "../../../../../public/images";
import { EyeSlashFilledIcon } from "../../../../../public/images";

interface IPropTypes {
  isFirstNameReq?: boolean;
  isLastNameReq?: boolean;
  isUsernameReq?: boolean;
  isEmailReq?: boolean;
  isPasswordReq?: boolean;
  isReEnterReq?: boolean;
  isProfileUpdate?: boolean;
  isChangePass?: boolean;
}

const GenericForm = ({
  isFirstNameReq,
  isLastNameReq,
  isUsernameReq,
  isEmailReq,
  isPasswordReq,
  isReEnterReq,
  isProfileUpdate,
  isChangePass,
}: IPropTypes) => {
  const { shareContext } = useShareContextHooks();
  const { focusState, handleFocus, handleBlur } = shareContext;

  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const [isVisibleReEnterPassword, setIsVisibleReEnterPassword] =
    useState<boolean>(false);

  return (
    <>
      {!isChangePass && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GroupField
            label="First Name"
            type="text"
            name="firstName"
            isRequired={isFirstNameReq}
            isFocused={focusState.firstName}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
          />
          <GroupField
            label="Last Name"
            type="text"
            name="lastName"
            isRequired={isLastNameReq}
            isFocused={focusState.lastName}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
          />
          <GroupField
            label="Username"
            type="text"
            name="username"
            isRequired={isUsernameReq}
            isFocused={focusState.username}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
          />
          <GroupField
            label="Email"
            type="email"
            name="email"
            isRequired={isEmailReq}
            isFocused={focusState.email}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            isEmailRegister={true}
          />
          {!isProfileUpdate && (
            <>
              <div className="relative">
                <GroupField
                  label="Password"
                  type={isVisiblePassword ? "text" : "password"}
                  name="password"
                  isRequired={isPasswordReq}
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
                  isRequired={isReEnterReq}
                  isFocused={focusState.reEnterPassword}
                  handleFocus={handleFocus}
                  handleBlur={handleBlur}
                  isReEnterRegister={true}
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
            </>
          )}
        </div>
      )}

      {isChangePass && (
        <>
          <div className="grid grid-cols-1 gap-6">
            <div className="relative">
              <GroupField
                label="Old Password"
                type={isVisiblePassword ? "text" : "password"}
                name="password"
                isRequired={isPasswordReq}
                isFocused={focusState.password}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                hasIconEnd={true}
                isOldPassword={true}
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
                label="New password"
                type={isVisibleReEnterPassword ? "text" : "password"}
                name="newPassword"
                isRequired={isReEnterReq}
                isFocused={focusState.newPassword}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                isNewPassword={true}
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
            <div className="relative">
              <GroupField
                label="Re-enter password"
                type={isVisibleReEnterPassword ? "text" : "password"}
                name="reEnterPassword"
                isRequired={isReEnterReq}
                isFocused={focusState.reEnterPassword}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                isReEnterPassword={true}
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
          </div>
        </>
      )}
    </>
  );
};
export default GenericForm;
