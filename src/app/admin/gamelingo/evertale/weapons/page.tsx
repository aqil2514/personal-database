import Link from "next/link";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { Metadata } from "next";
import Data from "./Data";

export const metadata: Metadata = {
  title: "Personal Database - Evertale Weapons",
};

export default async function Characters() {

  return (
    <div className="w-full p-10 ">
      <h1 className="text-center font-playfair font-bold mb-5">Weapons Name (Halaman Admin)</h1>

      <Data />
    </div>
  );
}
