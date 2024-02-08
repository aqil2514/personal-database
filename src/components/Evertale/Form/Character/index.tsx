"use client";

import React, {
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import CharStatus from "./CharStatus";
import CharImages from "./CharImage";
import CharIntro from "./CharIntro";
import CharProfile from "./CharProfile";
import CharActiveSkills from "./CharActiveSkill";
import CharPassiveSkills from "./CharPassiveSkill";
import { Button } from "@/components/General/Button";
import {
  CharacterProvider,
  useCharacterData,
} from "@/components/Evertale/Providers";
import Buttons from "./Buttons";

export default function Form() {
  const { data } = useCharacterData();

  console.log(data);

  // useEffect(() => {
  //   const isThere = localStorage.getItem("evertaleCharData");
  //   if (isThere) {
  //     const choice = confirm("Kemajuan sebelumnya ada di LocalStorage. Lanjutkan data?");
  //     if (!choice) {
  //       localStorage.removeItem("evertaleCharData");
  //       return;
  //     }
  //     console.log(isThere)
  //     setData(JSON.parse(isThere));
  //     return;
  //   }
  // }, [setData]);

  const notifRef = React.useRef<null | HTMLParagraphElement>(null);

  const router = useRouter();

  return (
    <CharacterProvider>
      <CharStatus />
      <CharImages />
      <CharIntro />
      <CharProfile />
      <CharActiveSkills />
      <CharPassiveSkills />
      <Buttons />
    </CharacterProvider>
  );
}
