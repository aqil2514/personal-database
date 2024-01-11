import Link from "next/link";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Data from "./data";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personal Database - Evertale Characters",
};

export default async function Characters() {
  const session = await getServerSession();

  if (!session) {
    redirect("/gamelingo/evertale/characters");
  }

  return (
    <div className="w-full p-10 ">
      <h1 className="text-center font-playfair font-bold mb-5">Characters Name (Halaman Admin)</h1>
      
      <Data />
    </div>
  );
}
