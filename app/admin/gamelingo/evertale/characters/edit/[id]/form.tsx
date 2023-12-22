"use client";

import { useParams, useRouter } from "next/navigation";
import { useContext, createContext, useCallback, useState, useEffect } from "react";
import CharStatus from "./CharStatus";
import axios from "axios";
import CharImages from "./CharImage";
import CharIntro from "./CharIntro";
import CharProfile from "./CharProfile";
import ActiveSkill from "./CharActiveSkill";
import PassiveSkill from "./CharPassiveSkill";

export const SECTION_TITLE_STYLE = "font-merriweather text-center font-bold mt-5";
export const SECTION_STYLE = "w-full px-4";
export const INPUT_STYLE = "block border-slate-200 focus-visible:border-green-200 w-full px-2 border-solid border-2";
export const TEXTAREA_STYLE = "block border-slate-200 focus-visible:border-green-200 w-full px-2 border-solid border-2";
export const SELECT_STYLE = "block border-slate-200 focus-visible:border-green-200 w-full px-2 border-solid border-2";
export const ADD_BUTTON_STYLE = "bg-green-800 text-white font-bold py-2 px-4 rounded m-1";
export const DELETE_BUTTON_STYLE = "bg-rose-800 text-white font-bold py-2 px-4 rounded m-1";
export const ICON_DELETE_STYLE = "text-rose-800 cursor-pointer";

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
const FormContext = createContext<any>(null);

export default function Form() {
  const [loading, setLoading] = useState<false | true>(false);
  const [oldCharacter, setOldCharacter] = useState<React.ComponentState>();
  const [character, setCharacter] = useState<React.ComponentState>();
  const { id } = useParams();
  const router = useRouter();

  const getDataCallback = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/gamelingo/newEvertale/chars?id=${id}`);

      setOldCharacter(data.char);
      setCharacter(data.char);

      document.title = `Edit ${data.char.charStatus.charName} - Personal Database `;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (!character) {
      getDataCallback();
    }
  }, [getDataCallback, character]);

  async function submitHandler(e: any) {
    e.preventDefault();
    const sure = confirm("Yakin dengan perubahannya?");
    if (!sure) {
      return;
    }

    axios
      .put("/api/gamelingo/newEvertale/chars", {
        submitData: character,
      })
      .then((res) => {
        console.log(res);
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

    // alert(data.msg);
    // router.replace(`/admin/gamelingo/evertale/characters/${character?._id}`);

    // const result = detectChanges(oldCharacter, character);

    // console.log(result);
  }

  return loading ? (
    <p>Loading...</p>
  ) : (
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
        <button type="button" className={ADD_BUTTON_STYLE + " m-4"} onClick={() => console.log(character)}>
          Lihat Data
        </button>
        <button onClick={() => setCharacter(oldCharacter)} type="button" className={ADD_BUTTON_STYLE + " m-4"}>
          Reset Pembaruan
        </button>
      </form>
    </FormContext.Provider>
  );
}

export function useStatus() {
  return useContext(StatusContext);
}

export function useCharacter() {
  return useContext(FormContext);
}
