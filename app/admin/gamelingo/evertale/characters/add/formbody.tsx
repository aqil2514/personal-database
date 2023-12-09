"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useFormState } from "react-dom";
import Skills from "./skills";
import CharProfile from "./profile";
import CharImages from "./images";
import CharIntro from "./intro";
import CharStatus from "./status";
import { action, Button } from "./actions";

interface DataLeader {
  id: string;
  name: string;
}

interface DataUnitConjure {
  id: string;
  name: string;
}

const SkillsContext = createContext<any>(null);
const StatusContext = createContext<any>(null);

export const SECTION_TITLE_STYLE = "font-merriweather text-center font-bold mt-5";
export const SECTION_STYLE = "w-full px-4";
export const INPUT_STYLE = "block border-slate-200 focus-visible:border-green-200 w-full px-2 border-solid border-2";
export const TEXTAREA_STYLE = "block border-slate-200 focus-visible:border-green-200 w-full px-2 border-solid border-2";
export const SELECT_STYLE = "block border-slate-200 focus-visible:border-green-200 w-full px-2 border-solid border-2";
export const ADD_BUTTON_STYLE = "bg-green-800 text-white font-bold py-2 px-4 rounded m-1";
export const DELETE_BUTTON_STYLE = "bg-rose-800 text-white font-bold py-2 px-4 rounded m-1";
export const ICON_DELETE_STYLE = "text-rose-800 cursor-pointer";

export default function FormBody() {
  const [loading, setLoading] = useState(false);
  const [dataLeaderSkill, setDataLeaderSkill] = useState<DataLeader[]>();
  const [dataUnitConjure, setDataUnitConjure] = useState<DataUnitConjure[]>();
  const [dataWeapon, setDataWeapon] = useState<React.ComponentState>();
  const [skills, setSkills] = useState<React.ComponentState>([]);
  const [submit, formAction] = useFormState<React.ComponentState>(action, null);

  async function getData() {
    try {
      setLoading(true);
      const res = await axios.get("/api/gamelingo/evertale");

      const data = res.data;

      setDataWeapon(data.weapons.weapons);
      setDataLeaderSkill(data.leaderskills.leaderskills);
      setDataUnitConjure(data.conjures.conjures);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <p>Loading...</p>
  ) : (
    <form action={formAction}>
      <StatusContext.Provider value={{ dataLeaderSkill, dataUnitConjure, skills, dataWeapon }}>
        <CharStatus />
      </StatusContext.Provider>

      <CharImages />

      <CharIntro />

      <CharProfile />

      <SkillsContext.Provider value={{ skills, setSkills }}>
        <Skills />
        <Button />
      </SkillsContext.Provider>
    </form>
  );
}

export function useSkills() {
  return useContext(SkillsContext);
}

export function useStatus() {
  return useContext(StatusContext);
}
