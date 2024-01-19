import EditForm from "@/components/Evertale/EditForm";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "EditCharacters - Personal Database",
};

export default async function Edit() {
  const session = await getServerSession();

  if (!session) {
    redirect("/gamelingo/evertale/characters");
  }

  return (
    <div id="form-container" className="w-full pb-10">
      <h1 className="font-playfair text-4xl my-5 text-center font-bold">Edit Data</h1>
      <EditForm />
    </div>
  );
}
