import Link from "next/link";
import { dataEvertale } from "@/components/Layouting/Data";
import { Metadata } from "next";
import { Button } from "@/components/General/Button";

export const metadata: Metadata = {
  title: "Personal Database - Evertale",
};

export default async function AdminPage() {
  return (
    <div className="block w-full pt-10">
      <h1 className="text-center m-2">Halaman Admin Evertale</h1>
      <div className="flex justify-center w-full mt-2">
        {dataEvertale.map((de) => (
          <Link key={de.id} href={de.pathAdmin} className="mx-5 h-0">
            <Button>{de.name}</Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
