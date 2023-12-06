import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Data from "./components/Data";

export const metadata: Metadata = {
  title: "Personal Database - Home",
};

export default async function AdminPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/admin");
  }

  return (
    <div className="block w-full pt-10">
      <h1 className="font-roboto text-center">Selamat Datang di Personal Database saya</h1>
      <Data />
    </div>
  );
}
