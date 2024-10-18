"use client";
import useContextHooks from "../../hooks/context-hooks";
import { Dispatch, SetStateAction, ChangeEvent } from "react";
import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import { FocusStateType, IFieldValueTypes } from "@/components/interface/global-interface";
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
}
interface AutocompleteItemType {
  value: string;
  label: string;
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
  isAutoComplete,
  isCustomNumber,
  items,
}: IGroupFieldTypes) => {
  const { shareContext } = useContextHooks();
  const { focusState, setFocusState, formValues, setFormValues } = shareContext;

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
    }

    if (hasError) {
      setFocusState((prev: FocusStateType) => ({ ...prev, [hasError]: false }));
    }

    setFormValues((prev: Record<string, string>) => ({ ...prev, [name]: e.target.value }));
  };

  const isError =
    (isEmailLogin && focusState.errorEmailLogin) ||
    (isEmailRegister && focusState.errorEmailRegister) ||
    (isReEnterRegister && focusState.errorReEnterRegister) ||
    (isPasswordLogin && focusState.errorPasswordLogin);
    const itemList = items ?? [];
  return (
    <>
      {isAutoComplete ? (
        <div className="group-input">
          <label className="text-base text-quaternary">{label}</label>
          <Autocomplete
            className={`custom-auto-complete rounded-md ${
              isFocused ? "border border-quaternary" : "border border-secondary"
            }`}
            name={name}
            aria-labelledby={name}
            onFocus={() => handleFocus(name)}
            onBlur={() => handleBlur(name)}
            defaultItems={items}
            selectedKey={formValues[value || name]}
            onSelectionChange={() =>
              setFormValues((prev: Record<string, string>) => ({ ...prev, [name]: value ?? '' }))
            }
          >
            {itemList.map((item: AutocompleteItemType) => (
              <AutocompleteItem key={item.value} value={item.value}>
                {item.label}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </div>
      ) : isCustomNumber ? (
        <>
          <div className="group-input">
            <label className="text-base text-quaternary">{label}</label>
            <Input
              type={type}
              placeholder={placeholder}
              className={`custom-input-number rounded-md ${
                isFocused
                  ? "border border-quaternary"
                  : "border border-secondary"
              }`}
              name={name}
              aria-labelledby={name}
              value={formValues[value || name]}
              onFocus={() => handleFocus(name)}
              onBlur={() => handleBlur(name)}
              onChange={(e) => handleOnChange(e, value || name)}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
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
