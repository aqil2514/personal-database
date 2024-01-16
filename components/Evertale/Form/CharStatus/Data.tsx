import { SectionWrapper } from "@/components/General/Wrapper";
import { useData } from "..";
import { Input, InputRadio } from "@/components/General/Input";
import { Option, OptionString, Select } from "@/components/General/Select";
import { CharTeam } from "./CharTeam";
import { LeaderSkill } from "./LeaderSkill";
import { charElement, charRank, charWeapon } from "../../Data";

export const Data = ({ info }: { info: any }) => {
  const { data, setData } = useData();

  function changeHandler(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, stateData: string) {
    setData({ ...data, charStatus: { ...data?.charStatus, [stateData]: e.target.value } });
  }
  return (
    <SectionWrapper>
      <Input variant="default" forId="charName" label="Unit Name" value={data?.charStatus?.charName} onChange={(e) => changeHandler(e, "charName")} />
      <Select variant="default" forId="charRank" onChange={(e) => changeHandler(e, "charRank")} label="Unit Rank">
        <Option isFirst>Character Rank</Option>
        <Option isFirst={false} dataMap={charRank} valueMap="rank" />
      </Select>
      <div id="isConjured">
        Conjure / Non-Conjure :
        <InputRadio forId="conjure" name="isConjured" label="Conjure" value="Conjure" onChange={(e) => changeHandler(e, "isConjured")} />
        <InputRadio forId="non-conjure" name="isConjured" label="Non Conjure" value="Non-Conjured" onChange={(e) => changeHandler(e, "isConjured")} />
      </div>
      <CharTeam info={info} />
      <Select variant="default" forId="charElement" onChange={(e) => changeHandler(e, "charElement")} label="Character Element">
        <Option isFirst>Element Character</Option>
        <Option isFirst={false} dataMap={charElement} valueMap="element" />
      </Select>
      <Select variant="default" forId="charWeapon1" onChange={(e) => changeHandler(e, "charWeapon1")} label="Character Weapon 1">
        <Option isFirst>Select Weapon</Option>
        <Option isFirst={false} dataMap={charWeapon} valueMap="name" />
      </Select>
      <Select variant="default" forId="charWeapon2" onChange={(e) => changeHandler(e, "charWeapon2")} label="Character Weapon 2">
        <Option isFirst>Select Weapon</Option>
        <Option isFirst={false} dataMap={charWeapon} valueMap="name" />
      </Select>
      <LeaderSkill data={data} setData={setData} info={info} />

      <Select variant="default" forId="charConjure" onChange={(e) => changeHandler(e, "charConjure")} label="Character Conjure">
        <Option isFirst>Select Conjure</Option>
        <OptionString dataMap={info} childMap="conjure" valueMap="conjure" />
      </Select>
    </SectionWrapper>
  );
};
