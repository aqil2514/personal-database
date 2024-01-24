import { Metadata } from "next";
import Data from "@/components/Layouting/Data";

export const metadata: Metadata = {
  title: "Personal Database - Home",
};

export default async function AdminPage() {
  return (
    <div className="block w-full pt-10">
      <h1 className="font-roboto text-center">Selamat Datang di Personal Database saya</h1>
      <Data />
    </div>
  );
}
