import { SectionWrapper } from "@/components/General/Wrapper";
import { Input, InputRadio } from "@/components/General/Input";
import { Option, OptionString, Select } from "@/components/General/Select";
import { CharTeam } from "./CharTeam";
import { LeaderSkill } from "./LeaderSkill";
import { charElement, charRank, charWeapon } from "../../../Data";
import { DataResponse } from ".";
import { useCharacterData } from "@/components/Evertale/Providers";

export const Data = ({ info }: { info: DataResponse }) => {
  const { data, setData } = useCharacterData();

  const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    localStorage.setItem("evertaleCharData", JSON.stringify(data));
    return (e.returnValue = true);
  };

  function changeHandler(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, stateData: string) {
    setData({ ...data, charStatus: { ...data?.charStatus, [stateData]: e.target.value } });
    if (e.target.value !== "") {
      window.addEventListener("beforeunload", beforeUnloadHandler, { capture: true });
    } else {
      window.removeEventListener("beforeunload", beforeUnloadHandler, { capture: true });
    }
  }
  return (
    <SectionWrapper>
      <Input variant="default" forId="charName" label="Unit Name" value={data?.charStatus?.charName} onChange={(e) => changeHandler(e, "charName")} />
      <Select variant="default" forId="charRank" value={data?.charStatus?.charRank} onChange={(e) => changeHandler(e, "charRank")} label="Unit Rank">
        <Option isFirst>Character Rank</Option>
        <Option isFirst={false} dataMap={charRank} valueMap="rank" />
      </Select>
      <div id="isConjured">
        Conjure / Non-Conjure :
        <InputRadio forId="conjure" name="isConjured" checked={data.charStatus.isConjured === "Conjure"} label="Conjure" value="Conjure" onChange={(e) => changeHandler(e, "isConjured")} />
        <InputRadio forId="non-conjure" name="isConjured" checked={data.charStatus.isConjured === "Non-Conjured"} label="Non Conjure" value="Non-Conjured" onChange={(e) => changeHandler(e, "isConjured")} />
      </div>
      <CharTeam info={info} />
      <Select variant="default" forId="charElement" value={data?.charStatus?.charElement} onChange={(e) => changeHandler(e, "charElement")} label="Character Element">
        <Option isFirst>Element Character</Option>
        <Option isFirst={false} dataMap={charElement} valueMap="element" />
      </Select>
      <Select variant="default" forId="charWeapon1" value={data?.charStatus?.charWeapon1} onChange={(e) => changeHandler(e, "charWeapon1")} label="Character Weapon 1">
        <Option isFirst>Select Weapon</Option>
        <Option isFirst={false} dataMap={charWeapon} valueMap="name" />
      </Select>
      <Select variant="default" forId="charWeapon2" value={data?.charStatus?.charWeapon2} onChange={(e) => changeHandler(e, "charWeapon2")} label="Character Weapon 2">
        <Option isFirst>Select Weapon</Option>
        <Option isFirst={false} dataMap={charWeapon} valueMap="name" />
      </Select>
      <LeaderSkill data={data} setData={setData} info={info} />

      <Select variant="default" forId="charConjure" value={data?.charStatus?.charConjure} onChange={(e) => changeHandler(e, "charConjure")} label="Character Conjure">
        <Option isFirst>Select Conjure</Option>
        <OptionString dataMap={info} childMap="conjure" valueMap="conjure" />
      </Select>
    </SectionWrapper>
  );
};
