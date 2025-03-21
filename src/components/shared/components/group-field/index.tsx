"use client";
import useShareContextHooks from "../../hooks/context-hooks/share-state-hooks";
import { ChangeEvent, useEffect } from "react";
import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import { FocusStateType } from "@/components/interface/global-interface";
import useGlobalHooks from "../../hooks/global-hooks";

interface IGroupFieldTypes {
  label: string;
  type?: string;
  name: string;
  value?: string;
  placeholder?: string;
  items?: { value: string; label: string }[];
  isFocused?: boolean;
  handleFocus: (field: string) => void;
  handleBlur: (field: string) => void;
  hasIconFirst?: boolean;
  hasIconEnd?: boolean;
  autoComplete?: string;
  isRequired?: boolean;
  isEmailLogin?: boolean;
  isEmailRegister?: boolean;
  isPasswordLogin?: boolean;
  isReEnterRegister?: boolean;
  isAutoComplete?: boolean;
  isCustomNumber?: boolean;
  isOldPassword?: boolean;
  isPassword?: boolean;
  isReEnterPassword?: boolean;
  selectedItem?: string;
}

const GroupField = ({
  label,
  placeholder,
  type,
  value,
  name,
  isFocused,
  handleFocus,
  handleBlur,
  hasIconFirst,
  hasIconEnd,
  autoComplete,
  isRequired,
  isEmailLogin,
  isEmailRegister,
  isPasswordLogin,
  isReEnterRegister,
  isOldPassword,
  isPassword,
  isReEnterPassword,
  isAutoComplete,
  isCustomNumber,
  items,
  selectedItem,
}: IGroupFieldTypes) => {
  const { shareContext } = useShareContextHooks();
  const { focusState, setFocusState, formValues, setFormValues } = shareContext;

  const { currencySymbol } = useGlobalHooks();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    e.preventDefault();
    let hasError = "";

    if (isEmailLogin) {
      hasError = "errorEmailLogin";
    } else if (isPasswordLogin) {
      hasError = "errorPasswordLogin";
    } else if (isEmailRegister) {
      hasError = "errorEmailRegister";
    } else if (isReEnterRegister) {
      hasError = "errorReEnterRegister";
    } else if (isOldPassword) {
      hasError = "errorOldPassword";
    } else if (isReEnterPassword) {
      hasError = "errorReEnterPassword";
    } else if (isPassword) {
      hasError = "errorPassword";
    } else if (name === "amount") {
      hasError = "errorAmount";
    }

    if (hasError) {
      setFocusState((prev: FocusStateType) => ({ ...prev, [hasError]: false }));
    }

    setFormValues((prev: Record<string, string>) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };
  const handleOnChangeAutoComplete = (name: string) => {
    let hasError = "";

    if (name === "category") {
      hasError = "errorCategory";
    } else if (name === "frequency") {
      hasError = "errorFrequency";
    } else if (name === "paymentMethod") {
      hasError = "errorPaymentMethod";
    }

    if (hasError) {
      setFocusState((prev: FocusStateType) => ({ ...prev, [hasError]: false }));
    }
  };

  const isError =
    (isEmailLogin && focusState.errorEmailLogin) ||
    (isEmailRegister && focusState.errorEmailRegister) ||
    (isReEnterRegister && focusState.errorReEnterRegister) ||
    (isPasswordLogin && focusState.errorPasswordLogin) ||
    (isOldPassword && focusState.errorOldPassword) ||
    (isPassword && focusState.errorPassword) ||
    (isReEnterPassword && focusState.errorReEnterPassword) ||
    (name === "amount" && focusState.errorAmount) ||
    (name === "category" && focusState.errorCategory) ||
    (name === "frequency" && focusState.errorFrequency) ||
    (name === "paymentMethod" && focusState.errorPaymentMethod);

  useEffect(() => {
    const date = new Date();
    if (formValues.date === "") {
      setFormValues((prev: Record<string, string>) => ({
        ...prev,
        date: date.toISOString().split("T")[0] ?? "",
      }));
    }
  }, []);

  return (
    <>
      {isAutoComplete ? (
        <div className="group-input">
          <label className={`text-base text-quaternary`}>
            {label}{" "}
            {isError && <span className="text-red-500 text-xs">*Required</span>}
          </label>
          <Autocomplete
            className={`custom-auto-complete rounded-md ${
              isFocused ? "border border-quaternary" : "border border-secondary"
            } ${
              isError
                ? "border border-red-500"
                : isFocused
                ? "border border-quaternary"
                : "border border-secondary"
            }`}
            name={name}
            aria-labelledby={name}
            onFocus={() => handleFocus(name)}
            onBlur={() => handleBlur(name)}
            defaultItems={items}
            defaultSelectedKey={
              selectedItem?.toLowerCase() || formValues[value || name]
            }
            onSelectionChange={(selected) => {
              setFormValues((prev: Record<string, string>) => ({
                ...prev,
                [name]: selected as string,
              }));
              handleOnChangeAutoComplete(name);
            }}
          >
            {(item) => (
              <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>
        </div>
      ) : isCustomNumber ? (
        <>
          <div className="group-input">
            <label className="text-base text-quaternary">
              {label}{" "}
              {isError && (
                <span className="text-red-500 text-xs">*Required</span>
              )}
            </label>
            <Input
              type={type}
              placeholder={placeholder}
              className={`custom-input-number rounded-md ${
                isFocused
                  ? "border border-quaternary"
                  : "border border-secondary"
              }
              ${
                isError
                  ? "border border-red-500"
                  : isFocused
                  ? "border border-quaternary"
                  : "border border-secondary"
              }`}
              name={name}
              aria-labelledby={name}
              value={formValues[value || name]}
              min="1"
              onInput={(e) =>
                ((e.target as HTMLInputElement).value = Math.max(
                  1,
                  Math.abs(parseFloat((e.target as HTMLInputElement).value))
                ).toString())
              }
              onFocus={() => handleFocus(name)}
              onBlur={() => handleBlur(name)}
              onChange={(e) => handleOnChange(e, value || name)}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">
                    {currencySymbol}
                  </span>
                </div>
              }
            />
          </div>
        </>
      ) : (
        <div className="group-input">
          <label
            htmlFor={name}
            className={`text-base ${
              isError ? "text-red-500" : "text-quaternary"
            }`}
          >
            {label}
          </label>
          <input
            type={type}
            name={name}
            id={name}
            aria-labelledby={name}
            placeholder={placeholder}
            value={formValues[value || name] ?? ""}
            maxLength={
              name === "firstName" || name === "lastName"
                ? 20
                : name === "username"
                ? 15
                : undefined
            }
            className={`text-base text-quaternary ${
              hasIconFirst ? "pl-6 pr-3" : hasIconEnd ? "pl-3 pr-10" : "px-3"
            } ${
              isError
                ? "border border-red-500"
                : isFocused
                ? "border border-quaternary"
                : "border border-secondary"
            }`}
            onChange={(e) => handleOnChange(e, value || name)}
            onFocus={() => handleFocus(name)}
            onBlur={() => handleBlur(name)}
            required={isRequired}
            autoComplete={autoComplete}
          />
        </div>
      )}
    </>
  );
};

export default GroupField;
