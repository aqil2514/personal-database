"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useContext, createContext, useCallback, useState, useEffect } from "react";
import CharStatus from "./CharStatus";
import axios from "axios";
import CharImages from "./CharImage";
import CharIntro from "./CharIntro";
import CharProfile from "./CharProfile";
import ActiveSkill from "./CharActiveSkill";
import PassiveSkill from "./CharPassiveSkill";
import useSWR from "swr";

export const SECTION_TITLE_STYLE = "font-merriweather text-center font-bold mt-5";
export const SECTION_STYLE = "w-full px-4";
export const INPUT_STYLE = "block border-slate-200 focus-visible:border-green-200 w-full px-2 border-solid border-2";
export const TEXTAREA_STYLE = "block border-slate-200 focus-visible:border-green-200 w-full px-2 border-solid border-2";
export const SELECT_STYLE = "block border-slate-200 focus-visible:border-green-200 w-full px-2 border-solid border-2";
export const ADD_BUTTON_STYLE = "bg-green-800 text-white font-bold py-2 px-4 rounded m-1";
export const DELETE_BUTTON_STYLE = "bg-rose-800 text-white font-bold py-2 px-4 rounded m-1";
export const ICON_DELETE_STYLE = "text-rose-800 cursor-pointer";

const FormContext = createContext<FormType>({} as FormType);
type FormType = {
  character: Evertale.Character.State;
  setCharacter: React.Dispatch<React.SetStateAction<Evertale.Character.State>>;
};

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export default function Form() {
  const [character, setCharacter] = React.useState<Evertale.Character.State>({} as Evertale.Character.State);
  const { id } = useParams();
  const router = useRouter();
  const URL = `/api/gamelingo/newEvertale/chars?id=${id}`;
  const { data, error, isLoading } = useSWR(URL, fetcher);

  if (isLoading || !data) return <p>Loading...</p>;
  if (error) return <p>error</p>;
  const init = data.char;

  document.title = `Edit ${data.char.charStatus.charName} - Personal Database `;

  console.log(data);

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const sure = confirm("Yakin dengan perubahannya?");
    if (!sure) {
      return;
    }

    axios
      .put("/api/gamelingo/newEvertale/chars", {
        submitData: character,
        action: "update",
      })
      .then((res) => {
        const data = res.data;
        alert(data.msg);
        router.back();
      })
      .catch((err) => {
        if (err.response.status === 422) {
          alert(err.response.data.msg);
          return;
        }
        if (err.response.status === 500) {
          alert("Ada kesalahan pada server");
          return;
        }
        console.error(err);
      });
  }

  async function seeHandler() {
    axios
      .put("/api/gamelingo/newEvertale/chars", {
        submitData: character,
        action: "see",
      })
      .then((res) => {
        alert("Lihat data lebih lanjut di Console Log (CTRL + SHIFT + I)");
        console.log(res.data);
      })
      .catch((err) => {
        if (err.response.status === 422) {
          alert(err.response.data.msg);
          return;
        }
        if (err.response.status === 500) {
          alert("Ada kesalahan pada server");
          return;
        }
        console.error(err);
      });
  }

  return (
    <FormContext.Provider value={{ character, setCharacter }}>
      <span onClick={router.back} className="bg-emerald-600 cursor-pointer px-4 py-2 mx-2 rounded font-bold text-white">
        &lt;
      </span>
      <form onSubmit={(e) => submitHandler(e)}>
        <CharStatus />

        <CharImages />

        <CharIntro />

        <CharProfile />

        <ActiveSkill />

        <PassiveSkill />
        <button className={ADD_BUTTON_STYLE + " m-4"}>Kirim Data</button>
        <button type="button" className={ADD_BUTTON_STYLE + " m-4"} onClick={seeHandler}>
          Lihat Data
        </button>
        <button onClick={() => setCharacter(init as Evertale.Character.State)} type="button" className={ADD_BUTTON_STYLE + " m-4"}>
          Reset Pembaruan
        </button>
      </form>
    </FormContext.Provider>
  );
}

export function useCharacter() {
  return useContext(FormContext);
}
