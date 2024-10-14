import { Dispatch, SetStateAction } from "react";
interface TypeComponents {
  label: string;
  type: string;
  name: string;
  value: any;
  isFocused: boolean;
  setIsFocused: Dispatch<SetStateAction<boolean>>;
}
const GroupField = ({
  label,
  type,
  value,
  name,
  isFocused,
  setIsFocused,
  hasIconFirst,
  hasIconEnd
}: 
any
) => (
  <div className="group-input">
    <label className="text-base text-quaternary">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      className={`text-base text-quaternary ${hasIconFirst ? "pl-6 pr-3" : hasIconEnd ? "pl-3 pr-10" : "px-3"}  ${
        isFocused ? "border border-quaternary" : "border border-secondary"
      }`}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      required
    />
  </div>
);
export default GroupField;
