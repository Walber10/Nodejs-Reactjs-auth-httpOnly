import React from "react";
import { UseControllerProps, FieldValues } from "react-hook-form";

interface Props extends UseControllerProps<FieldValues> {
  label: string;
  required?: boolean;
  inputType?: string;
  minLength?: number;
  maxLength?: number;
}

const CustomInput: React.FC<Props> = ({
  label,
  inputType = "text",
  minLength,
  maxLength,
  ...rest
}) => {
  return (
    <div>
      <label
        className={`text-l mb-2 block font-medium text-gray-900 ${
          rest.required
            ? 'after:ml-0.5 after:text-red-400 after:content-["*"]'
            : ""
        }`}
      >
        {label}
      </label>
      <input
        type={inputType}
        className="box-shadow block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-[inset_0_0_0px_1000px_rgb(249,250,251)] duration-300 selection:bg-blue-200 focus:border-amber-50 focus:outline-none focus:ring focus:ring-red-300/90"
        {...rest}
        autoComplete="on"
        minLength={minLength}
        maxLength={maxLength}
      />
    </div>
  );
};

export default CustomInput;
