import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { dataGameLingo } from "@/components/Layouting/Data";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Personal Database - GameLingo",
};

export default async function AdminPage() {
  const session = await getServerSession();

  if (session?.user) {
    redirect("/admin/gamelingo");
  }

  return (
    <div className="block w-full pt-10">
      <h1 className="text-center">Gamelingo Database</h1>
      <div className="flex justify-center w-full mt-2">
        {dataGameLingo.map((dgl) => (
          <Link key={dgl.id} href={dgl.path} className="mx-5 h-0">
            <button className="bg-orange-600 rounded px-2 py-1 font-merriweather text-white hover:bg-orange-500 hover:text-black">{dgl.name}</button>
          </Link>
        ))}
      </div>
    </div>
  );
}
