"use client";

import { ADD_BUTTON_STYLE, INPUT_STYLE, SECTION_TITLE_STYLE, SELECT_STYLE, TEXTAREA_STYLE } from "@/app/components/Styles";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import useSWR from "swr";
// import { FormEvent } from "react";

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

const WeaponDetail = ({ id }: { id: string }) => {
  const URL = `/api/gamelingo/newEvertale/weapon?id=${id}`;

  const [isFormLoading, setIsFormLoading] = React.useState(false);
  const formRef = useRef(null);
  const router = useRouter();

  // Fetching Data
  const { data, isLoading, error } = useSWR(URL, fetcher);
  if (!data || isLoading) return <p>Mengambil data weapon...</p>;
  if (error) {
    console.log(error);
    return <p>Gagal Mengambil data...</p>;
  }
  const weapon = data.weapon;

  // Submit Handler
  const submitHandler = async (e: any) => {
    e.preventDefault();
    const dataForm = new FormData(e.target);
    let value = [];
    let key = [];

    for (const formValue of dataForm.values()) {
      value.push(formValue);
    }

    for (const formKey of dataForm.keys()) {
      key.push(formKey);
    }

    const data: Record<string, string> = {};
    for (let i = 0; i < key.length; i++) {
      data[key[i]] = value[i] as string;
    }

    try {
      setIsFormLoading(true);
      const res = await axios.put("/api/gamelingo/newEvertale/weapon", {
        data,
        id,
      });

      alert(res.data.msg);
      router.push("/admin/gamelingo/evertale/weapons");
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 422) {
          alert(error.response?.data.msg);
          console.error("Terjadi kesalahan : ", error.response?.data.msg);
        }
        if (error.response?.status === 500) {
          alert("Terjadi kesalahan pada server");
          console.error("Terjadi kesalahan : ", error);
        }
        console.error(error);
      }
    } finally {
      setIsFormLoading(false);
    }
  };

  return (
    <form method="post" ref={formRef} onSubmit={(e) => submitHandler(e)}>
      {/* Weapon Name  */}
      <p>CTRL + Shift + A untuk memunculkan atau menghilangkan navigasi</p>
      <label htmlFor="weapon-name" id="identity">
        Weapon Name :
      </label>
      <input className={INPUT_STYLE} defaultValue={weapon.weapName} type="text" name="weapName" id="weapon-name" disabled={isFormLoading} required />

      {/* Weapon Image */}
      <label htmlFor="weapImagePng">Weapon Image PNG:</label>
      <input className={INPUT_STYLE} defaultValue={weapon.weapImage.png} type="text" id="weapImagePng" name="weapImagePng" disabled={isFormLoading} required />

      <label htmlFor="weapImageWebp">Weapon Image Webp:</label>
      <input className={INPUT_STYLE} defaultValue={weapon.weapImage.webp} type="text" id="weapImageWebp" name="weapImageWebp" disabled={isFormLoading} required />

      {/* Weapon Rank  */}
      <label htmlFor="weapRank">Weapon Rank:</label>
      <select className={SELECT_STYLE} id="weapRank" defaultValue={weapon.weapRank} name="weapRank" required>
        <option value="SSR">SSR</option>
        <option value="SR">SR</option>
        <option value="R">R</option>
        <option value="N">N</option>
      </select>

      {/* Weapon Type */}
      <label htmlFor="weapType">Weapon Type:</label>
      <select className={SELECT_STYLE} defaultValue={weapon.weapType} id="weapType" name="weapType" required>
        <option value="Sword">Sword</option>
        <option value="Axe">Axe</option>
        <option value="Staff">Staff</option>
        <option value="Mace">Mace</option>
        <option value="GreatSword">GreatSword</option>
        <option value="GreatAxe">GreatAxe</option>
        <option value="Spear">Spear</option>
        <option value="Hammer">Hammer</option>
        <option value="Katana">Katana</option>
      </select>

      {/* Weapon Lore  */}
      <label htmlFor="weapLore">Weapon English Lore:</label>
      <textarea disabled={isFormLoading} defaultValue={weapon.weapLore.loreEn} className={TEXTAREA_STYLE} id="weapLore" name="weapEnLore" required></textarea>

      <label htmlFor="weapLore">Weapon Indonesian Lore:</label>
      <textarea disabled={isFormLoading} defaultValue={weapon.weapLore.loreEn} className={TEXTAREA_STYLE} id="weapLore" name="weapIdLore" required></textarea>

      {/* Weapon Ascending */}
      {/* ******* */}
      {/* No Ascend */}
      <h1 className={SECTION_TITLE_STYLE} id="no-ascend">
        No Ascend
      </h1>
      <label htmlFor="naWeapEnSkill">Weapon English Skill:</label>
      <textarea disabled={isFormLoading} defaultValue={weapon.weapAscend.noAscend.weapSkill.skillEn} className={TEXTAREA_STYLE} id="naWeapEnSkill" name="naWeapEnSkill" required />
      <label htmlFor="naWeapIdSkill">Weapon Indonesian Skill:</label>
      <textarea disabled={isFormLoading} defaultValue={weapon.weapAscend.noAscend.weapSkill.skillId} className={TEXTAREA_STYLE} id="naWeapIdSkill" name="naWeapIdSkill" required />
      <label htmlFor="naPower">Weapon Power:</label>
      <input className={INPUT_STYLE} type="number" defaultValue={weapon.weapAscend.noAscend.status.power} name="naPower" id="naPower" disabled={isFormLoading} />
      <label htmlFor="naHP">Weapon HP:</label>
      <input className={INPUT_STYLE} type="number" defaultValue={weapon.weapAscend.noAscend.status.hp} name="naHP" id="naHP" disabled={isFormLoading} />
      <label htmlFor="naATK">Weapon ATK:</label>
      <input className={INPUT_STYLE} type="number" defaultValue={weapon.weapAscend.noAscend.status.atk} name="naATK" id="naATK" disabled={isFormLoading} />
      <label htmlFor="naLvl">Weapon Level:</label>
      <input className={INPUT_STYLE} type="number" defaultValue={weapon.weapAscend.noAscend.status.level} name="naLvl" id="naLvl" disabled={isFormLoading} />
      <label htmlFor="naBoost">Weapon Boost:</label>
      <input className={INPUT_STYLE} type="number" defaultValue={weapon.weapAscend.noAscend.status.boost} name="naBoost" id="naBoost" disabled={isFormLoading} />
      <label htmlFor="naPot">Weapon Potential:</label>
      <input className={INPUT_STYLE} type="number" defaultValue={weapon.weapAscend.noAscend.status.potential} name="naPot" id="naPot" disabled={isFormLoading} />

      {/* Ascend1 */}
      <h1 className={SECTION_TITLE_STYLE} id="ascend-1">
        Ascend 1
      </h1>
      <label htmlFor="a1WeapEnSkill">Weapon English Skill:</label>
      <textarea disabled={isFormLoading} defaultValue={weapon.weapAscend.ascend1.weapSkill.skillEn} className={TEXTAREA_STYLE} id="a1WeapEnSkill" name="a1WeapEnSkill" required />
      <label htmlFor="a1WeapIdSkill">Weapon Indonesian Skill:</label>
      <textarea disabled={isFormLoading} defaultValue={weapon.weapAscend.ascend1.weapSkill.skillId} className={TEXTAREA_STYLE} id="a1WeapIdSkill" name="a1WeapIdSkill" required />
      <label htmlFor="a1Power">Weapon Power:</label>
      <input className={INPUT_STYLE} type="number" name="a1Power" id="a1Power" disabled={isFormLoading} defaultValue={weapon.weapAscend.ascend1.status.power} />
      <label htmlFor="a1HP">Weapon HP:</label>
      <input className={INPUT_STYLE} type="number" name="a1HP" id="a1HP" disabled={isFormLoading} defaultValue={weapon.weapAscend.ascend1.status.hp} />
      <label htmlFor="a1ATK">Weapon ATK:</label>
      <input className={INPUT_STYLE} type="number" name="a1ATK" id="a1ATK" disabled={isFormLoading} defaultValue={weapon.weapAscend.ascend1.status.atk} />
      <label htmlFor="a1Lvl">Weapon Level:</label>
      <input className={INPUT_STYLE} type="number" name="a1Lvl" id="a1Lvl" disabled={isFormLoading} defaultValue={weapon.weapAscend.ascend1.status.level} />
      <label htmlFor="a1Boost">Weapon Boost:</label>
      <input className={INPUT_STYLE} type="number" name="a1Boost" id="a1Boost" disabled={isFormLoading} defaultValue={weapon.weapAscend.ascend1.status.boost} />
      <label htmlFor="a1Pot">Weapon Potential:</label>
      <input className={INPUT_STYLE} type="number" name="a1Pot" id="a1Pot" disabled={isFormLoading} defaultValue={weapon.weapAscend.ascend1.status.potential} />

      {/* Full Ascend  */}
      <h1 className={SECTION_TITLE_STYLE} id="full-ascend">
        Full Ascend
      </h1>
      <label htmlFor="faWeapEnSkill">Weapon English Skill:</label>
      <textarea defaultValue={weapon.weapAscend.fullAscend.weapSkill.skillEn} disabled={isFormLoading} className={TEXTAREA_STYLE} id="faWeapEnSkill" name="faWeapEnSkill" required />
      <label htmlFor="faWeapIdSkill">Weapon Indonesian Skill:</label>
      <textarea defaultValue={weapon.weapAscend.fullAscend.weapSkill.skillId} disabled={isFormLoading} className={TEXTAREA_STYLE} id="faWeapIdSkill" name="faWeapIdSkill" required />
      <label htmlFor="faPower">Weapon Power:</label>
      <input className={INPUT_STYLE} type="number" name="faPower" id="faPower" defaultValue={weapon.weapAscend.fullAscend.status.power} disabled={isFormLoading} />
      <label htmlFor="faHP">Weapon HP:</label>
      <input className={INPUT_STYLE} type="number" name="faHP" id="faHP" defaultValue={weapon.weapAscend.fullAscend.status.hp} disabled={isFormLoading} />
      <label htmlFor="faATK">Weapon ATK:</label>
      <input className={INPUT_STYLE} type="number" name="faATK" id="faATK" defaultValue={weapon.weapAscend.fullAscend.status.atk} disabled={isFormLoading} />
      <label htmlFor="faLvl">Weapon Level:</label>
      <input className={INPUT_STYLE} type="number" name="faLvl" id="faLvl" defaultValue={weapon.weapAscend.fullAscend.status.level} disabled={isFormLoading} />
      <label htmlFor="faBoost">Weapon Boost:</label>
      <input className={INPUT_STYLE} type="number" name="faBoost" id="faBoost" defaultValue={weapon.weapAscend.fullAscend.status.boost} disabled={isFormLoading} />
      <label htmlFor="faPot">Weapon Potential:</label>
      <input className={INPUT_STYLE} type="number" name="faPot" id="faPot" defaultValue={weapon.weapAscend.fullAscend.status.potential} disabled={isFormLoading} />

      {/* Max Status */}
      <h1 className={SECTION_TITLE_STYLE} id="max-status">
        Max Status
      </h1>
      <label htmlFor="maxPower">Weapon Power:</label>
      <input className={INPUT_STYLE} type="number" name="maxPower" id="maxPower" defaultValue={weapon.weapMax.status.power} disabled={isFormLoading} />
      <label htmlFor="maxHP">Weapon HP:</label>
      <input className={INPUT_STYLE} type="number" name="maxHP" id="maxHP" defaultValue={weapon.weapMax.status.hp} disabled={isFormLoading} />
      <label htmlFor="maxATK">Weapon ATK:</label>
      <input className={INPUT_STYLE} type="number" name="maxATK" id="maxATK" defaultValue={weapon.weapMax.status.atk} disabled={isFormLoading} />
      <label htmlFor="maxLvl">Weapon Level:</label>
      <input className={INPUT_STYLE} type="number" name="maxLvl" id="maxLvl" defaultValue={weapon.weapMax.status.level} disabled={isFormLoading} />
      <label htmlFor="maxBoost">Weapon Boost:</label>
      <input className={INPUT_STYLE} type="number" name="maxBoost" id="maxBoost" defaultValue={weapon.weapMax.status.boost} disabled={isFormLoading} />
      <label htmlFor="maxPot">Weapon Potential:</label>
      <input className={INPUT_STYLE} type="number" name="maxPot" id="maxPot" defaultValue={weapon.weapMax.status.potential} disabled={isFormLoading} />

      {/* Submit Button */}
      <button type="submit" disabled={isFormLoading} className={ADD_BUTTON_STYLE}>
        {isFormLoading ? "Mengirim Data..." : "Tambah Data"}
      </button>
    </form>
  );
};

export default WeaponDetail;
