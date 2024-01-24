export const SectionWrapper = ({ children, id }: { children: React.ReactNode; id?: string }) => {
  return (
    <div className="w-full px-4" id={id}>
      {children}
    </div>
  );
};

interface TitleSectionProps extends React.HTMLProps<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const TitleSection = ({ children, ...props }: TitleSectionProps) => {
  return (
    <h2 className={"font-merriweather text-center font-bold mt-5 text-xl"} {...props}>
      {children}
    </h2>
  );
};
