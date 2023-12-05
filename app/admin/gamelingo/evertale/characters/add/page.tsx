import { getServerSession } from "next-auth";
import FormBody from "./formbody";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Personal Database - Add Characters",
};

export default async function Add() {
  const session = await getServerSession();

  if (!session) {
    redirect("/gamelingo/evertale/characters");
  }
  return (
    <div id="form-container" className="w-full pb-10">
      <h1 className="font-playfair text-4xl my-5 text-center font-bold">Tambah Data</h1>

      <FormBody />
    </div>
  );
}
