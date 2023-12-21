"use client";

import React, { createContext, useContext, useState } from "react";
import CharProfile from "./profile";
import CharImages from "./images";
import CharIntro from "./intro";
import CharStatus from "./status";
import CharActiveSkills from "./CharActiveSkills";
import { CharacterState } from "./interface";
import CharPassiveSkills from "./CharPassiveSkills";
import { ADD_BUTTON_STYLE } from "@/app/components/Styles";

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

  return (
    <FormContext.Provider value={{ data, setData }}>
      <CharStatus />
      <CharImages />
      <CharIntro />
      <CharProfile />
      <CharActiveSkills />
      <CharPassiveSkills />
      <button className={ADD_BUTTON_STYLE + " block"} type="button" onClick={() => console.log(data)}>
        Lihat Data
      </button>
    </FormContext.Provider>
  );
}

export function useData() {
  return useContext(FormContext);
}
