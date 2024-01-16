export const SectionWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full px-4">{children}</div>;
};

export const TitleSection = ({ children }: { children: React.ReactNode }) => {
  return <h3 className={"font-merriweather text-center font-bold mt-5 text-xl"}>{children}</h3>;
};
