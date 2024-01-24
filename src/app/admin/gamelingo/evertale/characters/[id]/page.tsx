import EvertaleCharacterPost from "@/components/Evertale/Post/Character";
import axios from "axios";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Record<string, string> }): Promise<Metadata> {
  const id = params.id;
  const isLocal = process.env.NODE_ENV === "development";
  const baseURL = isLocal ? "http://localhost:3000" : "https://aqil-personal-database.vercel.app";
  const apiURL = `${baseURL}/api/gamelingo/newEvertale/chars?id=${id}`;

  try {
    const { data } = await axios(apiURL);
    const char: Evertale.Character.State = data.char;
    const charName = (char.charStatus as Evertale.Character.Status).charName;

    return {
      title: charName,
    };
  } catch (error) {
    console.log(error);
    return {
      title: "Deskripsi Karakter",
    };
  }
}

export default function Detail() {
  return <EvertaleCharacterPost />;
}
