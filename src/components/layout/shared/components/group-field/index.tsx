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
}: 
any
) => (
  <div className="group-input">
    <label>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      className={`${
        isFocused ? "border border-black" : "border border-secondary"
      }`}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  </div>
);
export default GroupField;
