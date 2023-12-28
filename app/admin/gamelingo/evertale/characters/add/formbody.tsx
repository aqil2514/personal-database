"use client";

import React, { createContext, useContext, useState } from "react";
import CharProfile from "./Component/CharProfile";
import CharIntro from "./Component/CharIntro";
import CharStatus from "./Component/CharStatus";
import CharImages from "./Component/CharImage";
import CharActiveSkills from "./Component/CharActiveSkills";
import { CharacterState } from "./interface";
import CharPassiveSkills from "./Component/CharPassiveSkills";
import { ADD_BUTTON_STYLE } from "@/app/components/Styles";
import axios from "axios";
import { useRouter } from "next/navigation";

const FormContext = createContext<React.ComponentState>(null);

export default function FormBody() {
  const [data, setData] = useState<CharacterState>({
    charStatus: {
      charName: "",
      charRank: undefined,
      charConjure: "",
      charElement: undefined,
      charLeaderSkill: "",
      charTeam: [""],
      charWeapon1: undefined,
      charWeapon2: undefined,
      isConjured: false,
    },
    charImage: {
      f1Img: "",
      f2Img: "",
      f3Img: "",
    },
    charIntro: {
      gachaIntroEn: "",
      gachaIntroId: "",
      gachaTextEn: "",
      gachaTextId: "",
      loginTextEn: "",
      loginTextId: "",
      text1En: "",
      text1Id: "",
      text2En: "",
      text2Id: "",
      text3En: "",
      text3Id: "",
      text4En: "",
      text4Id: "",
    },
    charProfile: {
      part1En: "",
      part1Id: "",
      part2En: "",
      part2Id: "",
      part3En: "",
      part3Id: "",
    },
    charActiveSkill: [],
    charPassiveSkill: [],
  });
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  const sendingHandler = async (type: string) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/gamelingo/newEvertale/chars", {
        data,
        action: type,
      });

      if (res.data.redirect) {
        alert(res.data.msg);
        router.replace("/admin/gamelingo/evertale/characters");
      }

      alert(res.data.msg);
      console.log(res.data.data);
    } catch (error: any) {
      alert(error.response.data.msg || "Terjadi kesalahan");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContext.Provider value={{ data, setData }}>
      <CharStatus />
      <CharImages />
      <CharIntro />
      <CharProfile />
      <CharActiveSkills />
      <CharPassiveSkills />
      <button className={ADD_BUTTON_STYLE + " block"} type="button" disabled={loading} onClick={() => sendingHandler("see")}>
        {loading ? "Sedang Verifikasi..." : "Verifikasi Data"}
      </button>
      <button className={ADD_BUTTON_STYLE + ""} type="button" disabled={loading} onClick={() => sendingHandler("add")}>
        {loading ? "Mengirim Data..." : "Kirim Data"}
      </button>
      <button className={ADD_BUTTON_STYLE + ""} type="button" disabled={loading} onClick={() => console.log(data)}>
        {loading ? "Mengirim Data..." : "Lihat Data"}
      </button>
    </FormContext.Provider>
  );
}

export function useData() {
  return useContext(FormContext);
}
