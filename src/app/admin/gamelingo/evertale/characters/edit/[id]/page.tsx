import EditForm from "@/components/Evertale/EditForm/Character";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EditCharacters - Personal Database",
};

export default async function Edit() {
  return (
    <div id="form-container" className="w-full pb-10">
      <h1 className="font-playfair text-4xl my-5 text-center font-bold">Edit Data</h1>
      <EditForm />
    </div>
  );
}
