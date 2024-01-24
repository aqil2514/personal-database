import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { dataGameLingo } from "@/components/Layouting/Data";
import { Button } from "@/components/General/Button";

export const metadata: Metadata = {
  title: "Personal Database - GameLingo",
};

export default async function AdminPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/gamelingo");
  }

  return (
    <div className="block w-full pt-10">
      <h1 className="text-center m-2">Halaman Gamelingo Admin</h1>
      <div className="flex justify-center w-full mt-2">
        {dataGameLingo.map((dgl) => (
          <Link key={dgl.id} href={dgl.path} className="mx-5 h-0">
            <Button variant="default">{dgl.name}</Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
