import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  forId: string;
  label: string;
  name?: string;
  ref?: React.MutableRefObject<null | HTMLInputElement>;
  variant?: "default";
}

const variantClass = {
  default: "block border-slate-200 focus-visible:border-green-200 w-full px-2 border-solid border-2",
};

export const Input = ({ forId, label, variant = "default", ...props }: InputProps) => {
  return (
    <label htmlFor={forId}>
      {label} : <input type="text" className={variantClass[variant] || variantClass.default} name={forId} id={forId} {...props} />
    </label>
  );
};

export const InputRadio = ({ forId, name, label, ...props }: InputProps) => {
  return (
    <label htmlFor={forId} className="mx-8">
      <input type="radio" name={name} id={forId} {...props} /> {label}
    </label>
  );
};
