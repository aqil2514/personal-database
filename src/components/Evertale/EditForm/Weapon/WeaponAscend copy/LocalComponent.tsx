import { Input } from "@/components/General/Input";
import { Textarea } from "@/components/General/Textarea";
import { TitleSection } from "@/components/General/Wrapper";
import { useWeaponData } from "@/components/Evertale/Providers";
import { editHandler } from "./LocalUtils";

export function WeaponAscendComponent({ ascend }: { ascend: "no-ascend" | "ascend-1" | "full-ascend" | "max-status" }) {
  if (ascend === "no-ascend") return <NoAscend />;
  else if (ascend === "ascend-1") return <Ascend1 />;
  else if (ascend === "full-ascend") return <FullAscend />;
  else if (ascend === "max-status") return <MaxStatus />;
}

function NoAscend() {
  const { data, setData } = useWeaponData();
  const noAscend = data.weapAscend?.noAscend;
  return (
    <>
      <TitleSection id="no-ascend">No Ascend</TitleSection>

      <Textarea forId="nAWeapSkillEn" value={noAscend?.weapSkill?.skillEn} onChange={(e) => editHandler(data, setData, e, "null", "null", "null", true, true, "en")} label="Weapon English Skill" />
      <Textarea forId="nAWeapSkillId" value={noAscend?.weapSkill?.skillId} onChange={(e) => editHandler(data, setData, e, "null", "null", "null", true, true, "id")} label="Weapon Indonesian Skill" />

      <Input type="number" forId="naPower" value={noAscend?.status?.power} label="Weapon Power" onChange={(e) => editHandler(data, setData, e, "noAscend", "status", "power")} />
      <Input type="number" forId="naHP" value={noAscend?.status?.hp} label="Weapon HP" onChange={(e) => editHandler(data, setData, e, "noAscend", "status", "hp")} />
      <Input type="number" forId="naATK" value={noAscend?.status?.atk} label="Weapon ATK" onChange={(e) => editHandler(data, setData, e, "noAscend", "status", "atk")} />
      <Input type="number" forId="naLvl" value={noAscend?.status?.level} label="Weapon Level" onChange={(e) => editHandler(data, setData, e, "noAscend", "status", "level")} />
      <Input type="number" forId="naBoost" value={noAscend?.status?.boost} label="Weapon Boost" onChange={(e) => editHandler(data, setData, e, "noAscend", "status", "boost")} />
      <Input type="number" forId="naPotential" value={noAscend?.status?.potential} label="Weapon Potential" onChange={(e) => editHandler(data, setData, e, "noAscend", "status", "potential")} />
      <Input type="number" forId="naCost" value={noAscend?.status?.cost} label="Weapon Cost" onChange={(e) => editHandler(data, setData, e, "noAscend", "status", "cost")} />
    </>
  );
}

function Ascend1() {
  const { data, setData } = useWeaponData();
  const ascend1 = data.weapAscend?.ascend1;
  return (
    <>
      <TitleSection id="ascend-1">Ascend 1</TitleSection>

      <Textarea forId="a1WeapSkillEn" value={ascend1?.weapSkill?.skillEn} label="Weapon English Skill" onChange={(e) => editHandler(data, setData, e, "ascend1", "weapSkill", "skillEn")} />
      <Textarea forId="a1WeapSkillId" value={ascend1?.weapSkill?.skillId} label="Weapon Indonesian Skill" onChange={(e) => editHandler(data, setData, e, "ascend1", "weapSkill", "skillId")} />

      <Input type="number" forId="a1Power" value={ascend1?.status?.power} label="Weapon Power" onChange={(e) => editHandler(data, setData, e, "ascend1", "status", "power")} />
      <Input type="number" forId="a1HP" value={ascend1?.status?.hp} label="Weapon HP" onChange={(e) => editHandler(data, setData, e, "ascend1", "status", "hp")} />
      <Input type="number" forId="a1ATK" value={ascend1?.status?.atk} label="Weapon ATK" onChange={(e) => editHandler(data, setData, e, "ascend1", "status", "atk")} />
      <Input type="number" forId="a1Lvl" value={ascend1?.status?.level} label="Weapon Level" onChange={(e) => editHandler(data, setData, e, "ascend1", "status", "level")} />
      <Input type="number" forId="a1Boost" value={ascend1?.status?.boost} label="Weapon Boost" onChange={(e) => editHandler(data, setData, e, "ascend1", "status", "boost")} />
      <Input type="number" forId="a1Potential" value={ascend1?.status?.potential} label="Weapon Potential" onChange={(e) => editHandler(data, setData, e, "ascend1", "status", "potential")} />
      <Input type="number" forId="a1Cost" value={ascend1?.status?.cost} label="Weapon Cost" onChange={(e) => editHandler(data, setData, e, "ascend1", "status", "cost")} />
    </>
  );
}

function FullAscend() {
  const { data, setData } = useWeaponData();
  const fullAscend = data.weapAscend?.fullAscend;
  return (
    <>
      <TitleSection id="full-ascend">Fulll Ascend</TitleSection>

      <Textarea forId="faWeapSkillEn" value={fullAscend?.weapSkill?.skillEn} label="Weapon English Skill" onChange={(e) => editHandler(data, setData, e, "fullAscend", "weapSkill", "skillEn")} />
      <Textarea forId="faWeapSkillId" value={fullAscend?.weapSkill?.skillId} label="Weapon Indonesian Skill" onChange={(e) => editHandler(data, setData, e, "fullAscend", "weapSkill", "skillId")} />

      <Input type="number" forId="faPower" value={fullAscend?.status?.power} label="Weapon Power" onChange={(e) => editHandler(data, setData, e, "fullAscend", "status", "power")} />
      <Input type="number" forId="faHP" value={fullAscend?.status?.hp} label="Weapon HP" onChange={(e) => editHandler(data, setData, e, "fullAscend", "status", "hp")} />
      <Input type="number" forId="faATK" value={fullAscend?.status?.atk} label="Weapon ATK" onChange={(e) => editHandler(data, setData, e, "fullAscend", "status", "atk")} />
      <Input type="number" forId="faLvl" value={fullAscend?.status?.level} label="Weapon Level" onChange={(e) => editHandler(data, setData, e, "fullAscend", "status", "level")} />
      <Input type="number" forId="faBoost" value={fullAscend?.status?.boost} label="Weapon Boost" onChange={(e) => editHandler(data, setData, e, "fullAscend", "status", "boost")} />
      <Input type="number" forId="faPotential" value={fullAscend?.status?.potential} label="Weapon Potential" onChange={(e) => editHandler(data, setData, e, "fullAscend", "status", "potential")} />
      <Input type="number" forId="faCost" value={fullAscend?.status?.cost} label="Weapon Cost" onChange={(e) => editHandler(data, setData, e, "fullAscend", "status", "cost")} />
    </>
  );
}

function MaxStatus() {
  const { data, setData } = useWeaponData();
  const weapMax = data.weapMax?.status;
  return (
    <>
      <TitleSection id="full-ascend">Max Status</TitleSection>
      <Input type="number" forId="maxPower" value={weapMax?.power} label="Weapon Power" onChange={(e) => editHandler(data, setData, e, "null", "null", "power", false)} />
      <Input type="number" forId="maxHP" value={weapMax?.hp} label="Weapon HP" onChange={(e) => editHandler(data, setData, e, "null", "null", "hp", false)} />
      <Input type="number" forId="maxATK" value={weapMax?.atk} label="Weapon ATK" onChange={(e) => editHandler(data, setData, e, "null", "null", "atk", false)} />
      <Input type="number" forId="maxLvl" value={weapMax?.level} label="Weapon Level" onChange={(e) => editHandler(data, setData, e, "null", "null", "level", false)} />
      <Input type="number" forId="maxBoost" value={weapMax?.boost} label="Weapon Boost" onChange={(e) => editHandler(data, setData, e, "null", "null", "boost", false)} />
      <Input type="number" forId="maxPotential" value={weapMax?.potential} label="Weapon Potential" onChange={(e) => editHandler(data, setData, e, "null", "null", "potential", false)} />
      <Input type="number" forId="maxCost" value={weapMax?.cost} label="Weapon Cost" onChange={(e) => editHandler(data, setData, e, "null", "null", "cost", false)} />
    </>
  );
}
