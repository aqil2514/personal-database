import Link from "next/link";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Data from "./data";

export const metadata: Metadata = {
  title: "Personal Database - Delete Characters",
};

export default async function Characters() {
  const session = await getServerSession();

  if (!session) {
    redirect("/gamelingo/evertale/characters");
  }

  return (
    <div className="w-full p-10 ">
      <h1 className="text-center font-playfair font-bold mb-5">Hapus Data</h1>
      <div>
        <Link href="/admin/gamelingo/evertale/characters" className="mx-2 px-2 py-1 rounded-lg font-roboto mx-2 font-roboto font-bold bg-amber-500 hover:bg-amber-200 hover:text-amber-950">
          Kembali
        </Link>
        <Link href="/admin/gamelingo/evertale/characters/add" className="mx-2 px-2 py-1 rounded-lg font-roboto font-bold bg-amber-500 hover:bg-amber-200 hover:text-amber-950 ">
          Tambah
        </Link>
      </div>
      <Data />
    </div>
  );
}
