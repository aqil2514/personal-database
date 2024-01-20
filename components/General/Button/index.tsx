import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "upload" | "fixation" | "danger";
  children: React.ReactNode;
}

const variantClass = {
  default: "bg-orange-600 rounded px-2 py-1 font-merriweather text-white hover:bg-orange-500 hover:text-black",
  upload: "bg-green-700 hover:bg-green-700 disabled:bg-green-200 font-bold rounded-lg px-4 py-2 text-white",
  fixation: "font-bold text-white hover:text-slate-50 px-4 py-2 my-2 disabled:text-slate-200 disabled:bg-blue-200 hover:bg-blue-600 bg-blue-700 rounded-lg block",
  danger: "bg-rose-800 text-white font-bold py-2 px-4 rounded m-1",
};

export const Button = ({ children, variant = "default", ...props }: ButtonProps) => {
  return (
    <button className={variantClass[variant] || variantClass.default} {...props}>
      {children}
    </button>
  );
};
