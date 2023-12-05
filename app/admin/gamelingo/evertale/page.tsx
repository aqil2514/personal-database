import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { dataEvertale } from "@/app/components/Data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personal Database - Evertale",
};

export default async function AdminPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/gamelingo/evertale");
  }

  return (
    <div className="block w-full pt-10">
      <h1 className="text-center m-2">Halaman Admin Evertale</h1>
      <div className="flex justify-center w-full mt-2">
        {dataEvertale.map((de) => (
          <Link key={de.id} href={de.pathAdmin} className="mx-5 h-0">
            <button className="bg-orange-600 rounded px-2 py-1 font-merriweather text-white hover:bg-orange-500 hover:text-black">{de.name}</button>
          </Link>
        ))}
      </div>
    </div>
  );
}
