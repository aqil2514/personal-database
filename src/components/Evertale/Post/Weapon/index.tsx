"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { PenFill } from "react-bootstrap-icons";
import useSWR from "swr";
import { FIGURE_STYLE, IMAGE_STYILE, P_STYLE1, SECTION_STYLE, SECTION_TITLE_STYLE } from "@/components/Layouting/Styles";
import Image from "next/image";

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export default function EvertaleWeaponPost({ id }: { id: string }) {
  const URL = `/api/gamelingo/newEvertale/weapon?id=${id}`;
  const router = useRouter();
  const regex = /\B(?=(\d{3})+(?!\d))/g;

  const { data, isLoading, error } = useSWR(URL, fetcher);
  if (!data || isLoading) return <p>Mengambil data weapon...</p>;
  if (error) {
    console.log(error);
    return <p>Gagal Mengambil data...</p>;
  }
  const weapon = data.weapon;
  return (
    <div className="p-10 w-full">
      <div className="flex flex-row ">
        <span onClick={router.back} className="bg-emerald-600 cursor-pointer px-4 py-2 mx-2 rounded font-bold text-white">
          &lt;
        </span>
        <Link className="bg-amber-600 cursor-pointer px-4 py-2 mx-2 rounded font-bold text-white" title="Edit weapon" href={`/admin/gamelingo/evertale/weapons/edit/${id}`}>
          <PenFill />
        </Link>
      </div>

      <div className={SECTION_STYLE}>
        <h1 className={SECTION_TITLE_STYLE}>{weapon.weapName}</h1>
      </div>

      {/* Weapon Image */}
      <div id="weap-Image">
        <figure className={FIGURE_STYLE}>
          <Image className={IMAGE_STYILE} width={720} height={720} src={weapon.weapImage.webp} alt={weapon.weapName} />
          <figcaption>{weapon.weapName}</figcaption>
        </figure>
      </div>

      {/* Weapon Identity */}
      <div id="weap-identity">
        <h3 className={SECTION_TITLE_STYLE}>Weapon Identity</h3>
        <p className={P_STYLE1}>
          <strong>Weapon Name : </strong>
          {weapon.weapName}
        </p>

        <p className={P_STYLE1}>
          <strong>Weapon Rank : </strong>
          {weapon.weapRank}
        </p>
        <p className={P_STYLE1}>
          <strong>Weapon Type : </strong>
          {weapon.weapType}
        </p>
        <article>
          <strong className={P_STYLE1}>Weapon Lore EN : </strong>
          <p className={P_STYLE1}>{weapon.weapLore.loreEn}</p>
        </article>
        <article>
          <strong className={P_STYLE1}>Weapon Lore Id : </strong>
          <p className={P_STYLE1}>{weapon.weapLore.loreId}</p>
        </article>
      </div>

      {/* Weapon No Ascend */}
      <div id="weap-no-ascend">
        <h3 className={SECTION_TITLE_STYLE}>Weapon No Ascend</h3>
        <p className={P_STYLE1}>
          <strong>Weapon Skill EN : </strong>
          {weapon.weapAscend.noAscend.weapSkill.skillEn}
        </p>

        <p className={P_STYLE1}>
          <strong>Weapon Skill ID : </strong>
          {weapon.weapAscend.noAscend.weapSkill.skillId}
        </p>

        <p className={P_STYLE1}>
          <strong>Weapon Power : </strong>
          {weapon.weapAscend.noAscend.status.power.toString().replace(regex, ",")}
        </p>

        <p className={P_STYLE1}>
          <strong>Weapon Atk : </strong>
          {weapon.weapAscend.noAscend.status.atk.toString().replace(regex, ",")}
        </p>

        <p className={P_STYLE1}>
          <strong>Weapon HP : </strong>
          {weapon.weapAscend.noAscend.status.hp.toString().replace(regex, ",")}
        </p>

        <p className={P_STYLE1}>
          <strong>Weapon Level : </strong>
          {weapon.weapAscend.noAscend.status.level.toString().replace(regex, ",")}
        </p>

        <p className={P_STYLE1}>
          <strong>Weapon Boost : </strong>
          {weapon.weapAscend.noAscend.status.boost.toString().replace(regex, ",")}
        </p>

        <p className={P_STYLE1}>
          <strong>Weapon Potential : </strong>
          {weapon.weapAscend.noAscend.status.potential.toString().replace(regex, ",")}%
        </p>
      </div>

      {/* Weapon Ascend 1 */}
      <div id="weap-ascend-1">
        <h3 className={SECTION_TITLE_STYLE}>Weapon Ascend 1</h3>
        <p className={P_STYLE1}>
          <strong>Weapon Skill EN : </strong>
          {weapon.weapAscend.ascend1.weapSkill.skillEn}
        </p>

        <p className={P_STYLE1}>
          <strong>Weapon Skill ID : </strong>
          {weapon.weapAscend.ascend1.weapSkill.skillId}
        </p>

        <p className={P_STYLE1}>
          <strong>Weapon Power : </strong>
          {weapon.weapAscend.ascend1.status.power.toString().replace(regex, ",")}
        </p>

        <p className={P_STYLE1}>
          <strong>Weapon Atk : </strong>
          {weapon.weapAscend.ascend1.status.atk.toString().replace(regex, ",")}
        </p>

        <p className={P_STYLE1}>
          <strong>Weapon HP : </strong>
          {weapon.weapAscend.ascend1.status.hp.toString().replace(regex, ",")}
        </p>

        <p className={P_STYLE1}>
          <strong>Weapon Level : </strong>
          {weapon.weapAscend.ascend1.status.level.toString().replace(regex, ",")}
        </p>

        <p className={P_STYLE1}>
          <strong>Weapon Boost : </strong>
          {weapon.weapAscend.ascend1.status.boost.toString().replace(regex, ",")}
        </p>

        <p className={P_STYLE1}>
          <strong>Weapon Potential : </strong>
          {weapon.weapAscend.ascend1.status.potential.toString().replace(regex, ",")}%
        </p>
      </div>

      {/* Weapon Full Ascend */}
      <div id="weap-full-ascend">
        <h3 className={SECTION_TITLE_STYLE}>Weapon Full Ascend</h3>
        <p className={P_STYLE1}>
          <strong>Weapon Skill EN : </strong>
          {weapon.weapAscend.fullAscend.weapSkill.skillEn}
        </p>

        <p className={P_STYLE1}>
          <strong>Weapon Skill ID : </strong>
          {weapon.weapAscend.fullAscend.weapSkill.skillId}
        </p>

        <p className={P_STYLE1}>
          <strong>Weapon Power : </strong>
          {weapon.weapAscend.fullAscend.status.power.toString().replace(regex, ",")}
        </p>

        <p className={P_STYLE1}>
          <strong>Weapon Atk : </strong>
          {weapon.weapAscend.fullAscend.status.atk.toString().replace(regex, ",")}
        </p>

        <p className={P_STYLE1}>
          <strong>Weapon HP : </strong>
          {weapon.weapAscend.fullAscend.status.hp.toString().replace(regex, ",")}
        </p>

        <p className={P_STYLE1}>
          <strong>Weapon Level : </strong>
          {weapon.weapAscend.fullAscend.status.level.toString().replace(regex, ",")}
        </p>

        <p className={P_STYLE1}>
          <strong>Weapon Boost : </strong>
          {weapon.weapAscend.fullAscend.status.boost.toString().replace(regex, ",")}
        </p>

        <p className={P_STYLE1}>
          <strong>Weapon Potential : </strong>
          {weapon.weapAscend.fullAscend.status.potential.toString().replace(regex, ",")}%
        </p>
      </div>

      {/* Weapon Max Status */}
      <div id="weap-max-status">
        <h3 className={SECTION_TITLE_STYLE}>Weapon Max Status</h3>
        <p className={P_STYLE1}>
          <strong>Weapon Power : </strong>
          {weapon.weapMax.status.power.toString().replace(regex, ",")}
        </p>

        <p className={P_STYLE1}>
          <strong>Weapon Atk : </strong>
          {weapon.weapMax.status.atk.toString().replace(regex, ",")}
        </p>

        <p className={P_STYLE1}>
          <strong>Weapon HP : </strong>
          {weapon.weapMax.status.hp.toString().replace(regex, ",")}
        </p>

        <p className={P_STYLE1}>
          <strong>Weapon Level : </strong>
          {weapon.weapMax.status.level.toString().replace(regex, ",")}
        </p>

        <p className={P_STYLE1}>
          <strong>Weapon Boost : </strong>
          {weapon.weapMax.status.boost.toString().replace(regex, ",")}
        </p>

        <p className={P_STYLE1}>
          <strong>Weapon Potential : </strong>
          {weapon.weapMax.status.potential.toString().replace(regex, ",")}%
        </p>
      </div>
    </div>
  );
}
