import React, { useState } from "react";
import { charElement, charRank, charWeapon } from "@/components/Evertale/Data";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { SectionWrapper, TitleSection } from "@/components/General/Wrapper";
import { useCharacter } from "..";
import { Input, InputRadio } from "@/components/General/Input";
import { editChangeHandler } from "../../../Utils";
import { CharTeam } from "./CharTeam";
import { LeaderSkill } from "./LeaderSkill";
import { Option, OptionString, Select } from "@/components/General/Select";
import Verifying from "./Verifying";

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export default function CharStatus() {
  const URL = "/api/gamelingo/newEvertale?category=statusResource";
  const init = useCharacter();
  const [char, setChar] = React.useState<Evertale.Character.State>(init);

  const { data, isLoading, error } = useSWR(URL, fetcher);

  const charStatus: Evertale.Character.Status = char.charStatus;

  function radioHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const element = e.target;
    if (element.id === "conjured-unit") {
      setChar({ ...char, charStatus: { ...char.charStatus, isConjured: true } });
    } else if (element.id === "non-conjured-unit") {
      setChar({ ...char, charStatus: { ...char.charStatus, isConjured: false } });
    }
  }
  return (
    <SectionWrapper>
      <details className="my-4">
        <summary>Character Status</summary>
        <TitleSection>Character Status</TitleSection>
        {/* Unit Name */}
        <Input forId="unit-name" label="Unit Name" data-field="charStatus" data-sub-field="charName" value={charStatus.charName} onChange={(e) => editChangeHandler(e, char, setChar)} />

        {/* Unit Rank  */}
        <Input forId="unit-rank" label="Unit Rank" data-field="charStatus" list="rank-list" data-sub-field="charRank" value={charStatus.charRank} onChange={(e) => editChangeHandler(e, char, setChar)} />
        <datalist id="rank-list">
          {charRank.map((rank) => (
            <option value={rank.rank} key={`list-rank-${rank.rank}`}></option>
          ))}
        </datalist>

        {/* Unit Element  */}
        <Input forId="unit-element" label="Unit Element" data-field="charStatus" list="element-list" data-sub-field="charElement" value={charStatus.charElement} onChange={(e) => editChangeHandler(e, char, setChar)} />
        <datalist id="element-list">
          {charElement.map((el) => (
            <option value={el.element} key={`list-element-${el.element}`}></option>
          ))}
        </datalist>

        {/* IsConjured */}
        <div>
          <p>Conjured Status:</p>
          <InputRadio forId="conjured-unit" name="isConjured" checked={charStatus.isConjured as boolean} label="Conjured" onChange={radioHandler} />
          <InputRadio forId="non-conjured-unit" name="isConjured" checked={!charStatus.isConjured as boolean} label="Non Conjured" onChange={radioHandler} />
        </div>

        {/* Character Team */}
        {!data || isLoading ? <p>Memuat Resources Team...</p> : <CharTeam charTeams={charStatus.charTeam} dataTeam={data.data.rss.typeCharTeam} data={char} setData={setChar} />}

        {/* Char Weapon 1 */}
        <Input forId="unit-weapon-1" label="Unit Weapon 1" data-field="charStatus" list="weapon-list" data-sub-field="charWeapon1" value={charStatus.charWeapon1} onChange={(e) => editChangeHandler(e, char, setChar)} />

        {/* Char Weapon 2 */}
        <Input forId="unit-weapon-2" label="Unit Weapon 2" data-field="charStatus" list="weapon-list" data-sub-field="charWeapon2" value={charStatus.charWeapon2} onChange={(e) => editChangeHandler(e, char, setChar)} />
        <datalist id="weapon-list">
          {charWeapon.map((weap) => (
            <option value={weap.name} key={`list-weapon-${weap.name}`}></option>
          ))}
        </datalist>

        {/* Char Leader Skill */}
        {!data || isLoading ? <p>Memuat Resources Leader Skill...</p> : <LeaderSkill data={char} setData={setChar} info={data.data.lsData} />}

        {/* Char Conjure */}
        {!data || isLoading ? (
          <p>Memuat Resources Conjures...</p>
        ) : (
          <Select
            variant="default"
            data-field="charStatus"
            data-sub-field="charConjure"
            forId="charConjure"
            value={charStatus.charConjure ? charStatus.charConjure : undefined}
            label="Character Conjure"
            onChange={(e) => editChangeHandler(e, char, setChar)}
          >
            <Option isFirst>Select Conjure</Option>
            <OptionString dataMap={data.data} childMap="conjure" valueMap="conjure" />
          </Select>
        )}

        {/* Verified */}
        <Verifying char={char} />
      </details>
    </SectionWrapper>
  );
}
