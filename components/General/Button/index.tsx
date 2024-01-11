import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "default";
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({ children, variant = "default", className }) => {
  if (variant === "default") return <ButtonDefault children={children} className={className} />;
};

const ButtonDefault = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <button className={`bg-orange-600 rounded px-2 py-1 font-merriweather text-white hover:bg-orange-500 hover:text-black ${className}`}>{children}</button>;
};
