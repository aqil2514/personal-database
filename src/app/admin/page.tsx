import { Metadata } from "next";
import Data from "@/components/Layouting/Data";

export const metadata: Metadata = {
  title: "Personal Database - Admin",
};

export default async function AdminPage() {
  return (
    <div className="block w-full pt-10">
      <h1 className="font-roboto text-center">Halaman Admin</h1>
      <Data />
    </div>
  );
}
