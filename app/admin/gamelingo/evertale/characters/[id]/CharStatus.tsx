import useSWR from "swr";
import { P_STYLE1, SECTION_TITLE_STYLE } from "./page";

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());
export default function CharStatus({ charStatus }: { charStatus: React.ComponentState }) {
  const encodedLeaderSkill = encodeURIComponent(charStatus.charLeaderSkill);
  const URL = `/api/gamelingo/newEvertale/leaderskill?&name=${encodedLeaderSkill}`;

  const { data, isLoading, error } = useSWR(URL, fetcher);
  if (error) console.error(error);

  return (
    <div>
      <h3 className={SECTION_TITLE_STYLE}>Character Status</h3>
      <p className={P_STYLE1}>
        <strong>Unit Name : </strong>
        {charStatus.charName}
      </p>

      <p className={P_STYLE1}>
        <strong>Unit Rank : </strong>
        {charStatus.charRank}
      </p>
      <p className={P_STYLE1}>
        <strong>Unit Leader Skill : </strong>
        {charStatus.charLeaderSkill}
      </p>
      <p className={P_STYLE1}>
        <strong>Description : </strong>
        {!data || isLoading ? "Mengambil data..." : data.ls.descEn}
      </p>
      <p className={P_STYLE1}>
        <strong>Deskripsi : </strong>
        {!data || isLoading ? "Mengambil data..." : data.ls.descId}
      </p>
      <p className={P_STYLE1}>
        <strong>Unit Element : </strong>
        {charStatus.charElement}
      </p>
      <p className={P_STYLE1}>
        <strong>Unit Team : </strong>
        {charStatus.charTeam}
      </p>
      <p className={P_STYLE1}>
        <strong>Unit Weapon : </strong>
        {charStatus.charWeapon1}
      </p>
      <p className={P_STYLE1}>
        <strong>Unit FA Weapon : </strong>
        {charStatus.charWeapon2}
      </p>
      <p className={P_STYLE1}>
        <strong>Conjure / Non Conjured : </strong>
        {charStatus.isConjured ? "Conjure" : "Non-Conjured"}
      </p>
      <p className={P_STYLE1}>
        <strong>Unit Conjure : </strong>
        {charStatus.charConjure}
      </p>
    </div>
  );
}
