import { useState } from "react";
import { SECTION_STYLE, SECTION_TITLE_STYLE, INPUT_STYLE, SELECT_STYLE, ADD_BUTTON_STYLE, useCharacter } from "./form";
import { charRank, charWeapon } from "../../../component/data";
import useSWR from "swr";

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export default function CharStatus() {
  const URL = "/api/gamelingo/newEvertale?category=lschar";

  const { character, setCharacter } = useCharacter();
  const { data, isLoading, error } = useSWR(URL, fetcher);
  return (
    <div id="character-status" className={SECTION_STYLE}>
      <h3 className={SECTION_TITLE_STYLE}>Character Status</h3>
      <label htmlFor="unit-name">
        {" "}
        Unit Name :{" "}
        <input className={INPUT_STYLE} value={character?.charStatus?.charName} onChange={(e) => setCharacter({ ...character, charStatus: { ...character.charStatus, charName: e.target.value } })} type="text" name="charName" id="unit-name" />
      </label>
      <label htmlFor="charRank">
        Unit Rank :
        <select
          className={SELECT_STYLE}
          value={character?.charStatus?.charRank}
          onChange={(e) => setCharacter({ ...character, charStatus: { ...character?.charStatus, charRank: e.target.value } })}
          name="charRank"
          id="charRank"
          defaultValue={undefined}
        >
          <option value={undefined}>Rank Character</option>
          {charRank?.map((r: any, i: number) => (
            <option value={r.rank} key={`rank-${i++}`}>
              {r.rank}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="select-status-element">
        {" "}
        Element :{" "}
        <select
          className={SELECT_STYLE}
          value={character?.charStatus?.charElement}
          onChange={(e) => setCharacter({ ...character, charStatus: { ...character.charStatus, charElement: e.target.value } })}
          name="statusElement"
          id="select-element"
          required
        >
          <option value={undefined}>Select Element</option>
          <option value="Fire">Fire</option>
          <option value="Water">Water</option>
          <option value="Earth">Earth</option>
          <option value="Storm">Storm</option>
          <option value="Light">Light</option>
          <option value="Dark">Dark</option>
        </select>
      </label>
      <div id="isConjured">
        Conjure / Non-Conjure :
        <label htmlFor="conjure" className="mx-8">
          <input type="radio" name="isConjured" id="conjure" value="Conjure" onChange={(e) => setCharacter({ ...character, charStatus: { ...character?.charStatus, isConjured: e.target.value } })} /> Conjure
        </label>
        <label htmlFor="non-conjure" className="mx-8">
          <input type="radio" name="isConjured" id="non-conjure" value="Non-Conjured" onChange={(e) => setCharacter({ ...character, charStatus: { ...character?.charStatus, isConjured: e.target.value } })} /> Non-Conjure
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
              setCharacter({ ...character, charStatus: { ...character.charStatus, charTeam: value } });
            }}
          >
            Fiksasi
          </button>
        </div>
      </div>
      <label htmlFor="charWeapon1">
        Unit Weapon 1 :
        <select
          className={SELECT_STYLE}
          value={character?.charStatus?.charWeapon1}
          onChange={(e) => setCharacter({ ...character, charStatus: { ...character?.charStatus, charWeapon1: e.target.value } })}
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
          value={character?.charStatus?.charWeapon2}
          onChange={(e) => setCharacter({ ...character, charStatus: { ...character?.charStatus, charWeapon2: e.target.value } })}
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
          value={character?.charStatus?.charLeaderSkill}
          onChange={(e) => setCharacter({ ...character, charStatus: { ...character?.charStatus, charLeaderSkill: e.target.value } })}
          name="leaderSkill"
          id="leaderSkill"
          defaultValue={undefined}
        >
          <option value={undefined}>Select Leader Skill</option>
          {data?.lsData?.map((e: any, i: number) => (
            <option value={e} key={`leader-skill-${i++}`}>
              {e}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="conjure">
        Conjure :
        <select
          className={SELECT_STYLE}
          value={character?.charStatus?.conjure}
          onChange={(e) => setCharacter({ ...character, charStatus: { ...character?.charStatus, conjure: e.target.value } })}
          name="conjure"
          id="conjure"
          defaultValue={undefined}
          disabled
        >
          <option value={undefined} disabled>
            Rapihin Karakter dulu
          </option>
        </select>
      </label>
    </div>
  );
}
