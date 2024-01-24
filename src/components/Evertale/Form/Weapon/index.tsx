"use client";

import { ADD_BUTTON_STYLE, INPUT_STYLE, SECTION_TITLE_STYLE, SELECT_STYLE, TEXTAREA_STYLE } from "@/components/Layouting/Styles";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import WeaponStatus from "./WeaponStatus";
import WeaponAscend from "./WeaponAscend";
// import { FormEvent } from "react";

const WeaponFormContext = React.createContext<WeaponFormContextTypes>({} as WeaponFormContextTypes);

type WeaponFormContextTypes = {
  data: Evertale.Weapon.State;
  setData: React.Dispatch<React.SetStateAction<Evertale.Weapon.State>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Form() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<Evertale.Weapon.State>({
    weapName: "",
    weapRank: "Weap Rank",
    weapType: "Weap Type",
    weapLore: {
      loreEn: "",
      loreId: "",
    },
    weapImage: {
      webp: "",
      png: "",
    },
    weapAscend: {
      noAscend: {
        weapSkill: {
          skillEn: "",
          skillId: "",
        },
        status: {
          power: 0,
          hp: 0,
          atk: 0,
          level: 0,
          boost: 0,
          potential: 0,
          cost: 0,
        },
      },
      ascend1: {
        weapSkill: {
          skillEn: "",
          skillId: "",
        },
        status: {
          power: 0,
          hp: 0,
          atk: 0,
          level: 0,
          boost: 0,
          potential: 0,
          cost: 0,
        },
      },
      fullAscend: {
        weapSkill: {
          skillEn: "",
          skillId: "",
        },
        status: {
          power: 0,
          hp: 0,
          atk: 0,
          level: 0,
          boost: 0,
          potential: 0,
          cost: 0,
        },
      },
    },
    weapMax: {
      status: {
        power: 0,
        hp: 0,
        atk: 0,
        level: 0,
        boost: 0,
        potential: 0,
        cost: 0,
      },
    },
  });
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
      console.log(res.data);
      router.replace("/admin/gamelingo/evertale/weapons");
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
      <WeaponFormContext.Provider value={{ data, setData, isLoading, setIsLoading }}>
        <WeaponStatus />
        <WeaponAscend />
      </WeaponFormContext.Provider>

      {/* Weapon Image */}
      {/* <label htmlFor="weapImagePng">Weapon Image PNG:</label>
      <input className={INPUT_STYLE} type="text" id="weapImagePng" name="weapImagePng" disabled={isLoading} required />
      
      <label htmlFor="weapImageWebp">Weapon Image Webp:</label>
    <input className={INPUT_STYLE} type="text" id="weapImageWebp" name="weapImageWebp" disabled={isLoading} required /> */}

      {/* Submit Button */}
      <button type="submit" disabled={isLoading} className={ADD_BUTTON_STYLE}>
        {isLoading ? "Mengirim Data..." : "Tambah Data"}
      </button>
    </form>
  );
}

export function useWeaponData() {
  return React.useContext(WeaponFormContext);
}
