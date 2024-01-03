"use client";

import { ADD_BUTTON_STYLE, INPUT_STYLE, SECTION_TITLE_STYLE, SELECT_STYLE, TEXTAREA_STYLE } from "@/app/components/Styles";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
// import { FormEvent } from "react";

const Form = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const formRef = useRef(null);
  const router = useRouter();
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
      setIsLoading(true);
      const res = await axios.post("/api/gamelingo/newEvertale/weapon", {
        data,
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
      setIsLoading(false);
    }
  };

  return (
    <form method="post" ref={formRef} onSubmit={(e) => submitHandler(e)}>
      {/* Weapon Name  */}
      <p>CTRL + Shift + A untuk memunculkan atau menghilangkan navigasi</p>
      <label htmlFor="weapon-name" id="identity">
        Weapon Name :
      </label>
      <input className={INPUT_STYLE} type="text" name="weapName" id="weapon-name" disabled={isLoading} required />

      {/* Weapon Image */}
      <label htmlFor="weapImagePng">Weapon Image PNG:</label>
      <input className={INPUT_STYLE} type="text" id="weapImagePng" name="weapImagePng" disabled={isLoading} required />

      <label htmlFor="weapImageWebp">Weapon Image Webp:</label>
      <input className={INPUT_STYLE} type="text" id="weapImageWebp" name="weapImageWebp" disabled={isLoading} required />

      {/* Weapon Rank  */}
      <label htmlFor="weapRank">Weapon Rank:</label>
      <select className={SELECT_STYLE} id="weapRank" name="weapRank" required>
        <option value="SSR">SSR</option>
        <option value="SR">SR</option>
        <option value="R">R</option>
        <option value="N">N</option>
      </select>

      {/* Weapon Type */}
      <label htmlFor="weapType">Weapon Type:</label>
      <select className={SELECT_STYLE} id="weapType" name="weapType" required>
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
      <textarea disabled={isLoading} className={TEXTAREA_STYLE} id="weapLore" name="weapEnLore" required></textarea>

      <label htmlFor="weapLore">Weapon Indonesian Lore:</label>
      <textarea disabled={isLoading} className={TEXTAREA_STYLE} id="weapLore" name="weapIdLore" required></textarea>

      {/* Weapon Ascending */}
      {/* ******* */}
      {/* No Ascend */}
      <h1 className={SECTION_TITLE_STYLE} id="no-ascend">
        No Ascend
      </h1>
      <label htmlFor="naWeapEnSkill">Weapon English Skill:</label>
      <textarea disabled={isLoading} className={TEXTAREA_STYLE} id="naWeapEnSkill" name="naWeapEnSkill" required />
      <label htmlFor="naWeapIdSkill">Weapon Indonesian Skill:</label>
      <textarea disabled={isLoading} className={TEXTAREA_STYLE} id="naWeapIdSkill" name="naWeapIdSkill" required />
      <label htmlFor="naPower">Weapon Power:</label>
      <input className={INPUT_STYLE} type="number" name="naPower" id="naPower" disabled={isLoading} />
      <label htmlFor="naHP">Weapon HP:</label>
      <input className={INPUT_STYLE} type="number" name="naHP" id="naHP" disabled={isLoading} />
      <label htmlFor="naATK">Weapon ATK:</label>
      <input className={INPUT_STYLE} type="number" name="naATK" id="naATK" disabled={isLoading} />
      <label htmlFor="naLvl">Weapon Level:</label>
      <input className={INPUT_STYLE} type="number" name="naLvl" id="naLvl" disabled={isLoading} />
      <label htmlFor="naBoost">Weapon Boost:</label>
      <input className={INPUT_STYLE} type="number" name="naBoost" id="naBoost" disabled={isLoading} />
      <label htmlFor="naPot">Weapon Potential:</label>
      <input className={INPUT_STYLE} type="number" name="naPot" id="naPot" disabled={isLoading} />

      {/* Ascend1 */}
      <h1 className={SECTION_TITLE_STYLE} id="ascend-1">
        Ascend 1
      </h1>
      <label htmlFor="a1WeapEnSkill">Weapon English Skill:</label>
      <textarea disabled={isLoading} className={TEXTAREA_STYLE} id="a1WeapEnSkill" name="a1WeapEnSkill" />
      <label htmlFor="a1WeapIdSkill">Weapon Indonesian Skill:</label>
      <textarea disabled={isLoading} className={TEXTAREA_STYLE} id="a1WeapIdSkill" name="a1WeapIdSkill" />
      <label htmlFor="a1Power">Weapon Power:</label>
      <input className={INPUT_STYLE} type="number" name="a1Power" id="a1Power" disabled={isLoading} />
      <label htmlFor="a1HP">Weapon HP:</label>
      <input className={INPUT_STYLE} type="number" name="a1HP" id="a1HP" disabled={isLoading} />
      <label htmlFor="a1ATK">Weapon ATK:</label>
      <input className={INPUT_STYLE} type="number" name="a1ATK" id="a1ATK" disabled={isLoading} />
      <label htmlFor="a1Lvl">Weapon Level:</label>
      <input className={INPUT_STYLE} type="number" name="a1Lvl" id="a1Lvl" disabled={isLoading} />
      <label htmlFor="a1Boost">Weapon Boost:</label>
      <input className={INPUT_STYLE} type="number" name="a1Boost" id="a1Boost" disabled={isLoading} />
      <label htmlFor="a1Pot">Weapon Potential:</label>
      <input className={INPUT_STYLE} type="number" name="a1Pot" id="a1Pot" disabled={isLoading} />

      {/* Full Ascend  */}
      <h1 className={SECTION_TITLE_STYLE} id="full-ascend">
        Full Ascend
      </h1>
      <label htmlFor="faWeapEnSkill">Weapon English Skill:</label>
      <textarea disabled={isLoading} className={TEXTAREA_STYLE} id="faWeapEnSkill" name="faWeapEnSkill" />
      <label htmlFor="faWeapIdSkill">Weapon Indonesian Skill:</label>
      <textarea disabled={isLoading} className={TEXTAREA_STYLE} id="faWeapIdSkill" name="faWeapIdSkill" />
      <label htmlFor="faPower">Weapon Power:</label>
      <input className={INPUT_STYLE} type="number" name="faPower" id="faPower" disabled={isLoading} />
      <label htmlFor="faHP">Weapon HP:</label>
      <input className={INPUT_STYLE} type="number" name="faHP" id="faHP" disabled={isLoading} />
      <label htmlFor="faATK">Weapon ATK:</label>
      <input className={INPUT_STYLE} type="number" name="faATK" id="faATK" disabled={isLoading} />
      <label htmlFor="faLvl">Weapon Level:</label>
      <input className={INPUT_STYLE} type="number" name="faLvl" id="faLvl" disabled={isLoading} />
      <label htmlFor="faBoost">Weapon Boost:</label>
      <input className={INPUT_STYLE} type="number" name="faBoost" id="faBoost" disabled={isLoading} />
      <label htmlFor="faPot">Weapon Potential:</label>
      <input className={INPUT_STYLE} type="number" name="faPot" id="faPot" disabled={isLoading} />

      {/* Max Status */}
      <h1 className={SECTION_TITLE_STYLE} id="max-status">
        Max Status
      </h1>
      <label htmlFor="maxPower">Weapon Power:</label>
      <input className={INPUT_STYLE} type="number" name="maxPower" id="maxPower" disabled={isLoading} />
      <label htmlFor="maxHP">Weapon HP:</label>
      <input className={INPUT_STYLE} type="number" name="maxHP" id="maxHP" disabled={isLoading} />
      <label htmlFor="maxATK">Weapon ATK:</label>
      <input className={INPUT_STYLE} type="number" name="maxATK" id="maxATK" disabled={isLoading} />
      <label htmlFor="maxLvl">Weapon Level:</label>
      <input className={INPUT_STYLE} type="number" name="maxLvl" id="maxLvl" disabled={isLoading} />
      <label htmlFor="maxBoost">Weapon Boost:</label>
      <input className={INPUT_STYLE} type="number" name="maxBoost" id="maxBoost" disabled={isLoading} />
      <label htmlFor="maxPot">Weapon Potential:</label>
      <input className={INPUT_STYLE} type="number" name="maxPot" id="maxPot" disabled={isLoading} />

      {/* Submit Button */}
      <button type="submit" disabled={isLoading} className={ADD_BUTTON_STYLE}>
        {isLoading ? "Mengirim Data..." : "Tambah Data"}
      </button>
    </form>
  );
};

export default Form;
