import React, { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  forId: string;
  label: string;
}

export function Textarea({ forId, label, ...props }: TextareaProps) {
  return (
    <label htmlFor={forId}>
      {" "}
      {label} :
      <textarea className="block border-slate-200 focus-visible:border-green-200 w-full px-2 border-solid border-2" name={forId} id={forId} {...props} />
    </label>
  );
}
