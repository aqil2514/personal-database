import Data from "./data";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personal Database - Evertale Characters",
};

export default async function Characters() {
  return (
    <div className="w-full p-10 ">
      <h1 className="text-center font-playfair font-bold mb-5">Characters Name (Halaman Admin)</h1>

      <Data />
    </div>
  );
}
