import React from "react";

export const Table: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <table className="w-full">{children}</table>;
};

export const Heading: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <thead>{children}</thead>;
};

export const Head: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <th className="border-solid hover:bg-emerald-500 border-2 border-white">{children}</th>;
};

export const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <tbody className="bg-emerald-800 font-poppins text-white">{children}</tbody>;
};

export const Row: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <tr className="bg-emerald-950 text-white font-roboto font-bold py-1 border-solid border-2 border-white">{children}</tr>;
};
