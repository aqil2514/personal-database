"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PenFill } from "react-bootstrap-icons";
import useSWR from "swr";
import CharImage from "./CharImage";
import CharStatus from "./CharStatus";
import CharIntro from "./CharIntro";
import CharProfile from "./CharProfile";
import CharActiveSkill from "./CharActiveSkill";
import CharPassiveSkill from "./CharPassiveSkill";

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export default function Detail() {
  const { id } = useParams();
  const URL = `/api/gamelingo/newEvertale/chars?id=${id}`;
  const router = useRouter();

  const { data, isLoading, error } = useSWR(URL, fetcher);
  if (!data || isLoading) return <p>Mengambil character...</p>;
  if (error) {
    console.log(error);
    return <p>Gagal Mengambil data...</p>;
  }
  console.log(data);
  return (
    <div className="p-10 w-full">
      <div className="flex flex-row ">
        <span onClick={router.back} className="bg-emerald-600 cursor-pointer px-4 py-2 mx-2 rounded font-bold text-white">
          &lt;
        </span>
        <Link className="bg-amber-600 cursor-pointer px-4 py-2 mx-2 rounded font-bold text-white" title="Edit Character" href={`/admin/gamelingo/evertale/characters/edit/${data?.charId}`}>
          <PenFill />
        </Link>
      </div>

      <CharImage charImage={data.char.charImage} charName={data.char.charStatus.charName} />

      <CharStatus charStatus={data.char.charStatus} />

      {Object.keys(data.char.charIntro).length > 1 && <CharIntro charIntro={data.char.charIntro} />}

      <CharProfile charProfile={data.char.charProfile} />

      <CharActiveSkill charActiveSkill={data.char.charActiveSkill} />

      <CharPassiveSkill charPassiveSkill={data.char.charPassiveSkill} />
    </div>
  );
}
