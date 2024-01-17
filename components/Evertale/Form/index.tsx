"use client";

import React, { SetStateAction, createContext, useContext, useState } from "react";
import { ADD_BUTTON_STYLE } from "@/app/components/Styles";
import axios from "axios";
import { useRouter } from "next/navigation";
import CharStatus from "./CharStatus";
import { CharacterState } from "../Interface";
import CharImages from "./CharImage";
import CharIntro from "./CharIntro";
import CharProfile from "./CharProfile";
import CharActiveSkills from "./CharActiveSkill";
import CharPassiveSkills from "./CharPassiveSkill";
import { Button } from "@/components/General/Button";

const FormContext = createContext<StateType>({} as StateType);

export type StateType = {
  data: CharacterState;
  setData: React.Dispatch<SetStateAction<any>>;
};

export default function Form() {
  const [data, setData] = useState<CharacterState>({
    charStatus: {
      charName: "",
      charRank: undefined,
      charConjure: "",
      charElement: undefined,
      charLeaderSkill: "",
      charTeam: [],
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
  const notifRef = React.useRef<null | HTMLParagraphElement>(null);

  const [sendLoading, setSendLoading] = React.useState<boolean>(false);
  const [verifLoading, setVerifLoading] = React.useState<boolean>(false);

  const router = useRouter();

  const sendingHandler = async (type: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
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

      const msg: string = res.data.msg;

      alert(msg);
      console.log(res.data);
    } catch (error: any) {
      console.error(error);
      const msg: string = error.response.data.msg;
      const ref: string = error.response.data.ref;
      const element = document.getElementById(ref) as HTMLInputElement;
      const notif = document.createElement("p") as HTMLParagraphElement;
      notif.setAttribute("class", "font-bold text-red-600 my-2");
      notif.innerHTML = msg || "Terjadi Kesalahan";
      element.after(notif);

      setTimeout(() => {
        notif.remove();
      }, 3000);

      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
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

      <div className="flex flex-row gap-4 m-2">
        <Button variant="upload" disabled={verifLoading || sendLoading} onClick={() => sendingHandler("see", setVerifLoading)}>
          {verifLoading ? "Sedang Verifikasi..." : "Verifikasi Data"}
        </Button>
        <Button variant="upload" disabled={verifLoading || sendLoading} onClick={() => sendingHandler("see", setSendLoading)}>
          {sendLoading ? "Mengirim Data..." : "Kirim Data"}
        </Button>
        <Button variant="fixation" disabled={verifLoading || sendLoading} onClick={() => sendingHandler("see", setSendLoading || setVerifLoading)}>
          Lihat Data
        </Button>
      </div>
    </FormContext.Provider>
  );
}

export function useData() {
  return useContext(FormContext);
}
