import React from "react";
import { twMerge, twJoin } from "tailwind-merge";

enum BackgroundColorsStyles {
  red = "bg-red-300/70 hover:bg-red-300 focus:ring-red-300",
  yellow = "bg-yellow-300/70 hover:bg-yellow-300 focus:ring-yellow-300",
  green = "bg-green-300/70 hover:bg-green-300 focus:ring-green-300",
  blue = "bg-blue-300/70 hover:bg-blue-300 focus:ring-blue-300",
  transparent = "bg-transparent hover:bg-gray-100 focus:ring-gray-100",
}

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  text: string;
  type_: "submit" | "button" | "reset";
  onClick?: React.MouseEventHandler;
  bgColor?: keyof typeof BackgroundColorsStyles;
  className?: string;
}

export const CustomButton: React.FC<ButtonProps> = ({
  text,
  bgColor = "blue",
  type_,
  onClick,
  className,
}) => {
  return (
    <>
      <button
        type={type_}
        className={twJoin(
          twMerge(
            "w-full rounded-lg px-5 py-2.5 text-sm font-medium text-gray-900/70 duration-200 focus:outline-none focus:ring-2",
            `${BackgroundColorsStyles[bgColor]}`
          ),
          className
        )}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
};
