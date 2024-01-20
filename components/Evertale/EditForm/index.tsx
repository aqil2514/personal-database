"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useContext, createContext } from "react";
import axios from "axios";
import useSWR from "swr";
import CharStatus from "./CharStatus";
import CharImages from "./CharImage";

export const SECTION_TITLE_STYLE = "font-merriweather text-center font-bold mt-5";
export const SECTION_STYLE = "w-full px-4";
export const INPUT_STYLE = "block border-slate-200 focus-visible:border-green-200 w-full px-2 border-solid border-2";
export const TEXTAREA_STYLE = "block border-slate-200 focus-visible:border-green-200 w-full px-2 border-solid border-2";
export const SELECT_STYLE = "block border-slate-200 focus-visible:border-green-200 w-full px-2 border-solid border-2";
export const ADD_BUTTON_STYLE = "bg-green-800 text-white font-bold py-2 px-4 rounded m-1";
export const DELETE_BUTTON_STYLE = "bg-rose-800 text-white font-bold py-2 px-4 rounded m-1";
export const ICON_DELETE_STYLE = "text-rose-800 cursor-pointer";

const FormContext = createContext<Evertale.Character.State>({} as Evertale.Character.State);

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export default function EditForm() {
  const { id } = useParams();
  const router = useRouter();
  const URL = `/api/gamelingo/newEvertale/chars?id=${id}`;
  const { data, error, isLoading } = useSWR(URL, fetcher);
  const [isVerified, setIsVerified] = React.useState<boolean>(false);

  const [character, setCharacter] = React.useState<Evertale.Character.State>({} as Evertale.Character.State);
  if (isLoading || !data) return <p>Loading...</p>;
  if (error) return <p>error</p>;
  const init: Evertale.Character.State = data.char;

  document.title = `Edit ${data.char.charStatus.charName} - Personal Database `;

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <FormContext.Provider value={init}>
      <span onClick={router.back} className="bg-emerald-600 cursor-pointer px-4 py-2 mx-2 rounded font-bold text-white">
        &lt;
      </span>
      <form onSubmit={(e) => submitHandler(e)}>
        <CharStatus />

        <CharImages />

        {/* <CharIntro />

        <CharProfile />

        <ActiveSkill />

        <PassiveSkill /> */}
        {/* <button className={ADD_BUTTON_STYLE + " m-4"}>Kirim Data</button>
        <button type="button" className={ADD_BUTTON_STYLE + " m-4"} onClick={seeHandler}>
          Lihat Data
        </button>
        <button onClick={() => setCharacter(init as Evertale.Character.State)} type="button" className={ADD_BUTTON_STYLE + " m-4"}>
          Reset Pembaruan
        </button> */}
      </form>
    </FormContext.Provider>
  );
}

export function useCharacter() {
  return useContext(FormContext);
}
