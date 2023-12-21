// import { useState } from "react";
import { charElement, charRank, charWeapon } from "../../component/data";
import { useData } from "./formbody";
import { SECTION_STYLE, INPUT_STYLE, SELECT_STYLE, ADD_BUTTON_STYLE } from "@/app/components/Styles";
import useSWR from "swr";

const Data = ({ info }: { info: any }) => {
  const { data, setData } = useData();
  return (
    <div id="character-status" className={SECTION_STYLE}>
      <label htmlFor="unit-name">
        {" "}
        Unit Name : <input value={data?.charStatus?.charName} onChange={(e) => setData({ ...data, charStatus: { ...data?.charStatus, charName: e.target.value } })} className={INPUT_STYLE} type="text" name="charName" id="unit-name" />
      </label>
      <label htmlFor="charRank">
        Unit Rank :
        <select className={SELECT_STYLE} value={data?.charStatus?.charRank} onChange={(e) => setData({ ...data, charStatus: { ...data?.charStatus, charRank: e.target.value } })} name="charRank" id="charRank" defaultValue={undefined}>
          <option value={undefined}>Rank Character</option>
          {charRank?.map((r: any, i: number) => (
            <option value={r.rank} key={`rank-${i++}`}>
              {r.rank}
            </option>
          ))}
        </select>
      </label>
      <div id="isConjured">
        Conjure / Non-Conjure :
        <label htmlFor="conjure" className="mx-8">
          <input type="radio" name="isConjured" id="conjure" value="Conjure" onChange={(e) => setData({ ...data, charStatus: { ...data?.charStatus, isConjured: e.target.value } })} /> Conjure
        </label>
        <label htmlFor="non-conjure" className="mx-8">
          <input type="radio" name="isConjured" id="non-conjure" value="Non-Conjured" onChange={(e) => setData({ ...data, charStatus: { ...data?.charStatus, isConjured: e.target.value } })} /> Non-Conjure
        </label>
      </div>
      <div id="charTeam">
        CharTeam:
        <div className="flex flex-row flex-wrap">
          <label htmlFor="poison-team">
            <input className="ml-4 mr-2" type="checkbox" name="poison-team" value="Poison Team" id="poison-team" />
            Poison Team
          </label>
          <label htmlFor="Burn-team">
            <input className="ml-4 mr-2" type="checkbox" name="Burn-team" value="Burn Team" id="Burn-team" />
            Burn Team
          </label>
          <label htmlFor="Sleep-team">
            <input className="ml-4 mr-2" type="checkbox" name="Sleep-team" value="Sleep Team" id="Sleep-team" />
            Sleep Team
          </label>
          <label htmlFor="cursed-sleep-team">
            <input className="ml-4 mr-2" type="checkbox" name="cursed-sleep-team" value="Cursed Sleep Team" id="cursed-sleep-team" />
            Cursed Sleep Team
          </label>
          <label htmlFor="Blood-team">
            <input className="ml-4 mr-2" type="checkbox" name="Blood-team" value="Blood Team" id="Blood-team" />
            Blood Team
          </label>
          <label htmlFor="Stun-team">
            <input className="ml-4 mr-2" type="checkbox" name="Stun-team" value="Stun Team" id="Stun-team" />
            Stun Team
          </label>
          <label htmlFor="General-team">
            <input className="ml-4 mr-2" type="checkbox" name="General-team" value="General Team" id="General-team" />
            General Team
          </label>
          <label htmlFor="Other-team">
            <input className="ml-4 mr-2" type="checkbox" name="Other-team" value="Other Team" id="Other-team" />
            Other Team
          </label>
          <button
            className={ADD_BUTTON_STYLE + " block"}
            type="button"
            onClick={() => {
              const els = document.querySelectorAll("#charTeam label input");
              const value: string[] = [];
              els.forEach((el: any) => {
                if (el.checked) {
                  value.push(el.value);
                }
              });
              setData({ ...data, charStatus: { ...data.charStatus, charTeam: value } });
            }}
          >
            Fiksasi
          </button>
        </div>
      </div>
      <label htmlFor="charElement">
        Unit Rank :
        <select
          className={SELECT_STYLE}
          value={data?.charStatus?.charElement}
          onChange={(e) => setData({ ...data, charStatus: { ...data?.charStatus, charElement: e.target.value } })}
          name="charElement"
          id="charElement"
          defaultValue={undefined}
        >
          <option value={undefined}>Element Character</option>
          {charElement?.map((e: any, i: number) => (
            <option value={e.element} key={`element-${i++}`}>
              {e.element}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="charWeapon1">
        Unit Weapon 1 :
        <select
          className={SELECT_STYLE}
          value={data?.charStatus?.charWeapon1}
          onChange={(e) => setData({ ...data, charStatus: { ...data?.charStatus, charWeapon1: e.target.value } })}
          name="charWeapon1"
          id="charWeapon1"
          defaultValue={undefined}
        >
          <option value={undefined}>Select Weapon</option>
          {charWeapon?.map((e: any, i: number) => (
            <option value={e.name} key={`weapon-I-${i++}`}>
              {e.name}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="charWeapon2">
        Unit Weapon 2 :
        <select
          className={SELECT_STYLE}
          value={data?.charStatus?.charWeapon2}
          onChange={(e) => setData({ ...data, charStatus: { ...data?.charStatus, charWeapon2: e.target.value } })}
          name="charWeapon2"
          id="charWeapon2"
          defaultValue={undefined}
        >
          <option value={undefined}>Select Weapon</option>
          {charWeapon?.map((e: any, i: number) => (
            <option value={e.name} key={`weapon-II-${i++}`}>
              {e.name}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="leaderSkill">
        Leader Skill :
        <select
          className={SELECT_STYLE}
          value={data?.charStatus?.leaderSkill}
          onChange={(e) => setData({ ...data, charStatus: { ...data?.charStatus, leaderSkill: e.target.value } })}
          name="leaderSkill"
          id="leaderSkill"
          defaultValue={undefined}
        >
          <option value={undefined}>Select Leader Skill</option>
          {info?.lsData?.map((e: any, i: number) => (
            <option value={e} key={`weapon-II-${i++}`}>
              {e}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="conjure">
        Conjure :
        <select className={SELECT_STYLE} value={data?.charStatus?.conjure} onChange={(e) => setData({ ...data, charStatus: { ...data?.charStatus, conjure: e.target.value } })} name="conjure" id="conjure" defaultValue={undefined} disabled>
          <option value={undefined} disabled>
            Rapihin Karakter dulu
          </option>
        </select>
      </label>
    </div>
  );
};

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export default function CharStatus() {
  const URL = "/api/gamelingo/newEvertale?category=lschar";
  const { data, isLoading, error } = useSWR(URL, fetcher);

  if (!data || isLoading) return <p>Mengambil data...</p>;
  if (error) return <p>Error...</p>;
  return <Data info={data} />;
}
