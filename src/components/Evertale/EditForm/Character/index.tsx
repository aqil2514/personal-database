"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useContext, createContext } from "react";
import axios from "axios";
import useSWR from "swr";
import CharStatus from "./CharStatus";
import CharImages from "./CharImage";
import CharIntro from "./CharIntro";
import CharProfile from "./CharProfile";
import CharActiveSkill from "./CharActiveSkill";
import CharPassiveSkill from "./CharPassiveSkill";

const FormContext = createContext<Evertale.Character.State>({} as Evertale.Character.State);

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export default function EditForm() {
  const { id } = useParams();
  const router = useRouter();
  const URL = `/api/gamelingo/newEvertale/chars?id=${id}`;
  const { data, error, isLoading } = useSWR(URL, fetcher);

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

        <CharIntro />

        <CharProfile />

        <CharActiveSkill />

        <CharPassiveSkill />
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
