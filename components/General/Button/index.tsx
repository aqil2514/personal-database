import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "upload";
  children: React.ReactNode;
}

const variantClass = {
  default: "bg-orange-600 rounded px-2 py-1 font-merriweather text-white hover:bg-orange-500 hover:text-black",
  upload: "bg-green-700 disabled:bg-green-200 font-bold rounded-lg px-4 py-2 text-white",
};

export const Button = ({ children, variant = "default", ...props }: ButtonProps) => {
  return (
    <button className={variantClass[variant] || variantClass.default} {...props}>
      {children}
    </button>
  );
};
