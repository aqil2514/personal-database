"use client";

import { useParams, useRouter } from "next/navigation";
import { useContext, createContext, useCallback, useState, useEffect } from "react";
import CharStatus from "./CharStatus";
import axios from "axios";
import CharImages from "./CharImage";
import CharIntro from "./CharIntro";
import CharProfile from "./CharProfile";

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
    try {
      e.preventDefault();
      const sure = confirm("Yakin dengan perubahannya?");
      if (!sure) {
        return;
      }

      const { data } = await axios.put("/api/gamelingo/newEvertale/chars", {
        submitData: character,
      });

      console.log(data);

      // alert(data.msg);
      // router.replace(`/admin/gamelingo/evertale/characters/${character?._id}`);
    } catch (error) {
      alert("Kesalahan validasi");
      console.error(error);
    }

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

        {/* <ActiveSkill />

        <PassiveSkill /> */}
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

function ActiveSkill() {
  const { character, setCharacter } = useContext(FormContext);

  return (
    <div id="character-images" className={SECTION_STYLE}>
      <h3 className={SECTION_TITLE_STYLE}>Character Active Skills</h3>
      {character?.nASkill?.map((nas: any, i: number) => (
        <div key={`active-skill-${i + 1}`}>
          <p>
            <strong>Active Skill {i + 1}</strong>
          </p>
          <label htmlFor={`active-skill-name-${i + 1}`}>
            Skill Name :{" "}
            <input
              className={INPUT_STYLE}
              value={nas?.skillName}
              onChange={(e) => {
                setCharacter({
                  ...character,
                  nASkill: [
                    ...character.nASkill.slice(0, i),
                    {
                      ...character.nASkill[i],
                      skillName: e.target.value,
                    },
                    ...character.nASkill.slice(i + 1),
                  ],
                });
              }}
              type="text"
              name="charName"
              id={`active-skill-name-${i + 1}`}
              required
            />
          </label>
          <label htmlFor={`active-skill-spirit-${i + 1}`}>
            Skill Spirit :{" "}
            <input
              className={INPUT_STYLE}
              value={nas?.spirit}
              onChange={(e) => {
                setCharacter({
                  ...character,
                  nASkill: [
                    ...character.nASkill.slice(0, i),
                    {
                      ...character.nASkill[i],
                      spirit: e.target.value,
                    },
                    ...character.nASkill.slice(i + 1),
                  ],
                });
              }}
              type="text"
              name="charName"
              id={`active-skill-name-${i + 1}`}
              required
            />
          </label>
          <label htmlFor={`active-skill-target-${i + 1}`}>
            Skill Target :{" "}
            <input
              className={INPUT_STYLE}
              value={nas?.target}
              onChange={(e) => {
                setCharacter({
                  ...character,
                  nASkill: [
                    ...character.nASkill.slice(0, i),
                    {
                      ...character.nASkill[i],
                      target: e.target.value,
                    },
                    ...character.nASkill.slice(i + 1),
                  ],
                });
              }}
              type="text"
              name="charName"
              id={`active-skill-name-${i + 1}`}
              required
            />
          </label>
          <label htmlFor={`active-skill-TU-${i + 1}`}>
            Skill TU :{" "}
            <input
              className={INPUT_STYLE}
              value={nas?.TU}
              onChange={(e) => {
                setCharacter({
                  ...character,
                  nASkill: [
                    ...character.nASkill.slice(0, i),
                    {
                      ...character.nASkill[i],
                      TU: e.target.value,
                    },
                    ...character.nASkill.slice(i + 1),
                  ],
                });
              }}
              type="text"
              name="charName"
              id={`active-skill-name-${i + 1}`}
              required
            />
          </label>
          <label htmlFor="passive-desc-en">
            Description :
            <textarea
              className={TEXTAREA_STYLE}
              value={nas?.descEn}
              onChange={(e) => {
                setCharacter({
                  ...character,
                  nASkill: [
                    ...character.nASkill.slice(0, i),
                    {
                      ...character.nASkill[i],
                      descEn: e.target.value,
                    },
                    ...character.nASkill.slice(i + 1),
                  ],
                });
              }}
              name="descEn"
              id="passive-desc-en"
            />
          </label>
          <label htmlFor="passive-desc-id">
            Deskripsi :
            <textarea
              className={TEXTAREA_STYLE}
              value={nas?.descId}
              onChange={(e) => {
                setCharacter({
                  ...character,
                  nASkill: [
                    ...character.nASkill.slice(0, i),
                    {
                      ...character.nASkill[i],
                      descId: e.target.value,
                    },
                    ...character.nASkill.slice(i + 1),
                  ],
                });
              }}
              name="descId"
              id="passive-desc-id"
            />
          </label>
        </div>
      ))}
    </div>
  );
}

function PassiveSkill() {
  const { character, setCharacter } = useContext(FormContext);

  return (
    <div id="character-images" className={SECTION_STYLE}>
      <h3 className={SECTION_TITLE_STYLE}>Character Passive Skills</h3>
      {character?.nPSkill?.map((nps: any, i: number) => (
        <div key={`active-skill-${i + 1}`}>
          <p>
            <strong>Passive Skill {i + 1}</strong>
          </p>
          <label htmlFor={`active-skill-name-${i + 1}`}>
            Skill Name :{" "}
            <input
              className={INPUT_STYLE}
              value={nps?.name}
              onChange={(e) => {
                setCharacter({
                  ...character,
                  nPSkill: [
                    ...character.nPSkill.slice(0, i),
                    {
                      ...character.nPSkill[i],
                      name: e.target.value,
                    },
                    ...character.nPSkill.slice(i + 1),
                  ],
                });
              }}
              type="text"
              name="charName"
              id={`active-skill-name-${i + 1}`}
              required
            />
          </label>
          <label htmlFor="passive-desc-en">
            Description :
            <textarea
              className={TEXTAREA_STYLE}
              value={nps?.descEN}
              onChange={(e) => {
                setCharacter({
                  ...character,
                  nPSkill: [
                    ...character.nPSkill.slice(0, i),
                    {
                      ...character.nPSkill[i],
                      descEN: e.target.value,
                    },
                    ...character.nPSkill.slice(i + 1),
                  ],
                });
              }}
              name="descEn"
              id="passive-desc-en"
            />
          </label>
          <label htmlFor="passive-desc-id">
            Deskripsi :
            <textarea
              className={TEXTAREA_STYLE}
              value={nps?.descID}
              onChange={(e) => {
                setCharacter({
                  ...character,
                  nPSkill: [
                    ...character.nPSkill.slice(0, i),
                    {
                      ...character.nPSkill[i],
                      descID: e.target.value,
                    },
                    ...character.nPSkill.slice(i + 1),
                  ],
                });
              }}
              name="descId"
              id="passive-desc-id"
            />
          </label>
        </div>
      ))}
    </div>
  );
}

export function useStatus() {
  return useContext(StatusContext);
}

export function useCharacter() {
  return useContext(FormContext);
}
