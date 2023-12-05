import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personal Database - MelodiMix",
};

export default async function AdminPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/admin/melodimix");
  }

  return (
    <>
      <h1>Halaman Melodimix Client</h1>
    </>
  );
}
