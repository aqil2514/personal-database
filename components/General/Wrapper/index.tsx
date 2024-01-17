export const SectionWrapper = ({ children, id }: { children: React.ReactNode; id?: string }) => {
  return (
    <div className="w-full px-4" id={id}>
      {children}
    </div>
  );
};

export const TitleSection = ({ children }: { children: React.ReactNode }) => {
  return <h3 className={"font-merriweather text-center font-bold mt-5 text-xl"}>{children}</h3>;
};
