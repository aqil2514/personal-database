"use client";

import { editWeaponHandler } from "@/components/Evertale/Utils";
import { useWeaponData } from "@/components/Evertale/Providers";
import { Input } from "@/components/General/Input";
import { Select } from "@/components/General/Select";
import { Textarea } from "@/components/General/Textarea";

export default function WeaponStatus() {
  const { data, setData, isLoading } = useWeaponData();
  const weaponRank: string[] = ["Weap Rank", "SSR", "SR", "R", "N"];
  const weaponType: string[] = ["Weap Type", "Sword", "Axe", "Staff", "Mace", "GreatSword", "GreatAxe", "Spear", "Hammer", "Katana"];

  return (
    <>
      {/* Weapon Name  */}
      <Input forId="weapon-name" label="Weapon Name" value={data.weapName} disabled={isLoading} onChange={(e) => editWeaponHandler(e, data, setData, "weapName")} />

      {/* Weapon Rank  */}
      <Select variant="default" forId="weapRank" value={data.weapRank} onChange={(e) => editWeaponHandler(e, data, setData, "weapRank")} label="Weapon Rank" name="weapRank" required>
        {weaponRank.map((rank) => (
          <option value={rank} key={`weapon-rank-${rank}`}>
            {rank}
          </option>
        ))}
      </Select>

      {/* Weapon Type */}
      <Select variant="default" forId="weapType" label="Weapon Type" value={data.weapType} onChange={(e) => editWeaponHandler(e, data, setData, "weapType")} name="weapType" required>
        {weaponType.map((type) => (
          <option value={type} key={`weapon-type-${type}`}>
            {type}
          </option>
        ))}
      </Select>

      {/* Weapon Lore  */}
      <Textarea forId="weapLoreEn" label="Weapon English Lore" />
      <Textarea forId="weapLoreId" label="Weapon Indonesian Lore" />
    </>
  );
}
