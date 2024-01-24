import { Metadata } from "next";
import Form from "@/components/Evertale/Form/Character";

export const metadata: Metadata = {
  title: "Personal Database - Add Characters",
};

export default async function Add() {
  return (
    <div id="form-container" className="w-full pb-10">
      <h1 className="font-playfair text-4xl my-5 text-center font-bold">Tambah Data</h1>

      <Form />
    </div>
  );
}
