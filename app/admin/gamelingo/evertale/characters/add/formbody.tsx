"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useFormState } from "react-dom";
import Skills from "./skills";
import CharProfile from "./profile";
import CharImages from "./images";
import CharIntro from "./intro";
import CharStatus from "./status";
import { action, Button } from "./actions";
import CharActiveSkills from "./CharActiveSkills";
import { CharacterState } from "./interface";
import CharPassiveSkills from "./CharPassiveSkills";

export const SECTION_TITLE_STYLE = "font-merriweather text-center font-bold mt-5";
export const SECTION_STYLE = "w-full px-4";
export const INPUT_STYLE = "block border-slate-200 focus-visible:border-green-200 w-full px-2 border-solid border-2";
export const TEXTAREA_STYLE = "block border-slate-200 focus-visible:border-green-200 w-full px-2 border-solid border-2";
export const SELECT_STYLE = "block border-slate-200 focus-visible:border-green-200 w-full px-2 border-solid border-2";
export const ADD_BUTTON_STYLE = "bg-green-800 text-white font-bold py-2 px-4 rounded m-1";
export const DELETE_BUTTON_STYLE = "bg-rose-800 text-white font-bold py-2 px-4 rounded m-1";
export const ICON_DELETE_STYLE = "text-rose-800 cursor-pointer";

const FormContext = createContext<React.ComponentState>(null);

export default function FormBody() {
  const [loading, setLoading] = useState(false);
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
  // const [dataLeaderSkill, setDataLeaderSkill] = useState<DataLeader[]>();
  // const [dataUnitConjure, setDataUnitConjure] = useState<DataUnitConjure[]>();
  // const [dataWeapon, setDataWeapon] = useState<React.ComponentState>();
  // const [skills, setSkills] = useState<React.ComponentState>([]);
  // const [submit, formAction] = useFormState<React.ComponentState>(action, null);

  // async function getData() {
  //   try {
  //     setLoading(true);
  //     const res = await axios.get("/api/gamelingo/evertale");

  //     const data = res.data;

  //     setDataWeapon(data.weapons.weapons);
  //     setDataLeaderSkill(data.leaderskills.leaderskills);
  //     setDataUnitConjure(data.conjures.conjures);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   getData();
  // }, []);

  return loading ? (
    <p>Loading...</p>
  ) : (
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
  // (
  //   <form action={formAction}>
  //     <StatusContext.Provider value={{ dataLeaderSkill, dataUnitConjure, skills, dataWeapon }}>
  //       <CharStatus />
  //     </StatusContext.Provider>

  //     <CharImages />

  //     <CharIntro />

  //     <CharProfile />

  //     <SkillsContext.Provider value={{ skills, setSkills }}>
  //       <Skills />
  //       <Button />
  //     </SkillsContext.Provider>
  //   </form>
  // );
}

export function useData() {
  return useContext(FormContext);
}

// export function useSkills() {
//   return useContext(SkillsContext);
// }

// export function useStatus() {
//   return useContext(StatusContext);
// }
