import EditForm from "@/components/Evertale/EditForm/Weapon";
import { SectionWrapper, TitleSection } from "@/components/General/Wrapper";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";

export const metadata: Metadata = {
  title: "Info Weapon | Personal Database",
};

async function getData(id: string) {
  const isLocal = process.env.NODE_ENV === "development";
  const baseURL = isLocal ? "http://localhost:3000" : "https://aqil-personal-database.vercel.app";
  const res = await fetch(`${baseURL}/api/gamelingo/newEvertale/weapon?id=${id}`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Terjadi kesalahan");
  }

  return res.json();
}

export default async function Weapon({ params }: { params: Record<string, string> }) {
  const { id } = params;

  const data = await getData(id);

  return (
    <SectionWrapper>
      <TitleSection>Edit Data Weapon</TitleSection>
      <EditForm old={data.weapon} />
    </SectionWrapper>
  );
}
