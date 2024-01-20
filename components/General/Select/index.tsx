import { OptionHTMLAttributes, SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  variant: "default";
  forId: string;
  label: string;
}

interface OptionProps extends OptionHTMLAttributes<HTMLOptionElement> {
  dataMap?: any;
  valueMap?: string;
  isFirst: boolean;
  children?: React.ReactNode;
}

interface OptionStringProps extends OptionHTMLAttributes<HTMLOptionElement> {
  dataMap: any;
  childMap: string;
  valueMap: string;
  "data-field"?: string;
  "data-sub-field"?: string;
}

const variantClass = {
  default: "block border-slate-200 focus-visible:border-green-200 w-full px-2 border-solid border-2",
};

export const Select = ({ variant = "default", forId, children, label, ...props }: SelectProps) => {
  return (
    <label htmlFor={forId}>
      {label} :
      <select name={forId} className={variantClass[variant]} id={forId} defaultValue={undefined} {...props}>
        {children}
      </select>
    </label>
  );
};

export const Option = ({ isFirst, dataMap, valueMap, children, ...props }: OptionProps) => {
  if (isFirst)
    return (
      <option value={undefined} {...props}>
        {children}
      </option>
    );

  if (!isFirst && valueMap) {
    return dataMap?.map((d: any, i: number) => (
      <option value={d[valueMap]} key={`${dataMap}-${i++}`} {...props}>
        {d[valueMap]}
      </option>
    ));
  }
};

export const OptionString = ({ dataMap, childMap }: OptionStringProps) => {
  if (childMap)
    return dataMap[childMap]?.map((valueMap: string, i: number) => (
      <option value={valueMap} key={`${valueMap}-${i++}`}>
        {valueMap}
      </option>
    ));
};
