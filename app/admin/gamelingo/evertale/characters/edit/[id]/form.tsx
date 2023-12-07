"use client";

import { useParams, useRouter } from "next/navigation";
import { useContext, createContext, useCallback, useState, useEffect } from "react";
import CharStatus from "./status";
import axios from "axios";

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
  const [dataLeaderSkill, setDataLeaderSkill] = useState<DataLeader[]>();
  const [dataUnitConjure, setDataUnitConjure] = useState<DataUnitConjure[]>();
  const [dataWeapon, setDataWeapon] = useState<React.ComponentState>();
  const { id } = useParams();
  const router = useRouter();

  const getDataCallback = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/gamelingo/evertale");

      const characters = data.chars;
      const selected = characters?.chars?.find((char: React.ComponentState) => char._id === id);

      setCharacter(selected);
      setOldCharacter(selected);
      console.log(selected);
      setDataWeapon(data.weapons.weapons);
      setDataLeaderSkill(data.leaderskills.leaderskills);
      setDataUnitConjure(data.conjures.conjures);

      document.title = `Edit ${selected.charStatus.charName} - Personal Database `;
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

  type AnyObject = Record<string, any>;

  function detectChanges(initialObject: AnyObject, modifiedObject: AnyObject): AnyObject {
    const changes: AnyObject = {};

    // Iterate through initialObject's keys
    Object.keys(initialObject).forEach((key) => {
      // Compare values of the same key in both objects
      if (initialObject[key] !== modifiedObject[key]) {
        changes[key] = modifiedObject[key];
      }
    });

    return changes;
  }

  async function submitHandler(e: any) {
    try {
      e.preventDefault();
      const sure = confirm("Yakin dengan perubahannya?");
      if (!sure) {
        return;
      }

      const { data } = await axios.put("/api/gamelingo/evertale", {
        submitData: character,
        typeData: "character",
      });

      alert(data.msg);
      router.replace(`/admin/gamelingo/evertale/characters/${character?._id}`);
    } catch (error) {
      console.error;
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
        <CharImages />

        <CharIntro />

        <StatusContext.Provider value={{ dataLeaderSkill, dataUnitConjure, dataWeapon }}>
          <CharStatus />
        </StatusContext.Provider>

        <CharProfile />

        <ActiveSkill />

        <PassiveSkill />
        <button className={ADD_BUTTON_STYLE + " m-4"}>Ubah Data</button>
        <button onClick={() => setCharacter(oldCharacter)} type="button" className={ADD_BUTTON_STYLE + " m-4"}>
          Reset Pembaruan
        </button>
      </form>
    </FormContext.Provider>
  );
}

function CharImages() {
  const { character, setCharacter } = useContext(FormContext);

  return (
    <div id="character-images" className={SECTION_STYLE}>
      <h3 className={SECTION_TITLE_STYLE}>Character Images</h3>
      <label htmlFor="char">
        Char Name : <input className={INPUT_STYLE} value={character?.charStatus?.charName} disabled type="text" name="charName" id="char" required />
      </label>
      <label htmlFor="f1Img">
        Form 1 Image :{" "}
        <input className={INPUT_STYLE} onChange={(e) => setCharacter({ ...character, charImage: { ...character.charImage, f1Img: e.target.value } })} value={character?.charImage?.f1Img} type="text" name="f1Img" id="f1Img" required />
      </label>
      <label htmlFor="f2Img">
        Form 2 Image : <input className={INPUT_STYLE} onChange={(e) => setCharacter({ ...character, charImage: { ...character.charImage, f2Img: e.target.value } })} value={character?.charImage?.f2Img} type="text" name="f2Img" id="f2Img" />
      </label>
      <label htmlFor="f3Img">
        Form 3 Image : <input className={INPUT_STYLE} onChange={(e) => setCharacter({ ...character, charImage: { ...character.charImage, f3Img: e.target.value } })} value={character?.charImage?.f3Img} type="text" name="f3Img" id="f3Img" />
      </label>
    </div>
  );
}

function CharProfile() {
  const { character, setCharacter } = useContext(FormContext);

  return (
    <div id="character-profil" className={SECTION_STYLE}>
      <h3 className={SECTION_TITLE_STYLE}>Character Profile</h3>
      <label htmlFor="part-1-en">
        {" "}
        English part 1 :{" "}
        <textarea
          className={TEXTAREA_STYLE}
          value={character?.charProfile?.part1En}
          onChange={(e) => setCharacter({ ...character, charProfile: { ...character.charProfile, part1En: e.target.value } })}
          placeholder="English Part 1..."
          defaultValue=""
          name="part-1-en"
          required
          id="part-1-en"
        />
      </label>
      <label htmlFor="part-1-id">
        {" "}
        Indonesia part 1 :{" "}
        <textarea
          className={TEXTAREA_STYLE}
          value={character?.charProfile?.part1Id}
          onChange={(e) => setCharacter({ ...character, charProfile: { ...character.charProfile, part1Id: e.target.value } })}
          placeholder="Indonesia Part 1..."
          defaultValue=""
          name="part-1-id"
          required
          id="part-1-id"
        />
      </label>
      <label htmlFor="part-2-en">
        {" "}
        English part 2 :{" "}
        <textarea
          className={TEXTAREA_STYLE}
          value={character?.charProfile?.part2En}
          onChange={(e) => setCharacter({ ...character, charProfile: { ...character.charProfile, part2En: e.target.value } })}
          placeholder="English Part 2..."
          defaultValue=""
          name="part-2-en"
          id="part-2-en"
        />
      </label>
      <label htmlFor="part-2-id">
        {" "}
        Indonesia part 2 :{" "}
        <textarea
          className={TEXTAREA_STYLE}
          value={character?.charProfile?.part2Id}
          onChange={(e) => setCharacter({ ...character, charProfile: { ...character.charProfile, part2Id: e.target.value } })}
          placeholder="Indonesia Part 2..."
          defaultValue=""
          name="part-2-id"
          id="part-2-id"
        />
      </label>
      <label htmlFor="part-3-en">
        {" "}
        English part 3 :{" "}
        <textarea
          className={TEXTAREA_STYLE}
          value={character?.charProfile?.part3En}
          onChange={(e) => setCharacter({ ...character, charProfile: { ...character.charProfile, part3En: e.target.value } })}
          placeholder="English Part 3..."
          defaultValue=""
          name="part-3-en"
          id="part-3-en"
        />
      </label>
      <label htmlFor="part-3-id">
        {" "}
        Indonesia part 3 :{" "}
        <textarea
          className={TEXTAREA_STYLE}
          value={character?.charProfile?.part3Id}
          onChange={(e) => setCharacter({ ...character, charProfile: { ...character.charProfile, part3Id: e.target.value } })}
          placeholder="Indonesia Part 3..."
          defaultValue=""
          name="part-3-id"
          id="part-3-id"
        />
      </label>
    </div>
  );
}

function CharIntro() {
  const [isCharInfo, setIsCharInfo] = useState<false | true>(true);
  const { character, setCharacter } = useContext(FormContext);

  return (
    <>
      <div id="character-intro" className={SECTION_STYLE}>
        <h3 className={SECTION_TITLE_STYLE}>Character Intro</h3>

        <div>
          <label htmlFor="isthere-char-info">
            Char Info
            <input type="checkbox" name="isthere-char-info" onChange={() => setIsCharInfo(!isCharInfo)} id="isthere-char-info" />
          </label>
        </div>
        {isCharInfo ? (
          <>
            <label htmlFor="gacha-intro-en">
              {" "}
              Gacha Intro EN :
              <textarea
                className={TEXTAREA_STYLE}
                value={character?.charIntro?.gachaIntroEn}
                onChange={(e) => setCharacter({ ...character, charIntro: { ...character.charIntro, gachaIntroEn: e.target.value } })}
                placeholder="Gacha Intro EN..."
                defaultValue=""
                name="gachaIntroEn"
                id="gacha-intro-en"
              />
            </label>
            <label htmlFor="gacha-intro-id">
              {" "}
              Gacha Intro ID :
              <textarea
                className={TEXTAREA_STYLE}
                value={character?.charIntro?.gachaIntroId}
                onChange={(e) => setCharacter({ ...character, charIntro: { ...character.charIntro, gachaIntroId: e.target.value } })}
                placeholder="Gacha Intro ID..."
                defaultValue=""
                name="gachaIntroId"
                id="gacha-intro-id"
              />
            </label>
            <label htmlFor="gacha-text-en">
              {" "}
              Gacha Text EN:
              <textarea
                className={TEXTAREA_STYLE}
                value={character?.charIntro?.gachaTextEn}
                onChange={(e) => setCharacter({ ...character, charIntro: { ...character.charIntro, gachaTextEn: e.target.value } })}
                placeholder="Gacha Text EN..."
                defaultValue=""
                name="gachaTextEn"
                id="gacha-text-en"
              />
            </label>

            <label htmlFor="gacha-text-id">
              {" "}
              Gacha Text ID:
              <textarea
                className={TEXTAREA_STYLE}
                value={character?.charIntro?.gachaTextId}
                onChange={(e) => setCharacter({ ...character, charIntro: { ...character.charIntro, gachaTextId: e.target.value } })}
                placeholder="Gacha Text ID..."
                defaultValue=""
                name="gachaTextId"
                id="gacha-text-id"
              />
            </label>

            <label htmlFor="login-text-en">
              {" "}
              Login Text EN:
              <textarea
                className={TEXTAREA_STYLE}
                value={character?.charIntro?.loginTextEn}
                onChange={(e) => setCharacter({ ...character, charIntro: { ...character.charIntro, loginTextEn: e.target.value } })}
                placeholder="Login Text EN..."
                defaultValue=""
                name="loginTextEn"
                id="login-text-en"
              />
            </label>

            <label htmlFor="login-text-id">
              {" "}
              Login Text ID:
              <textarea
                className={TEXTAREA_STYLE}
                value={character?.charIntro?.loginTextId}
                onChange={(e) => setCharacter({ ...character, charIntro: { ...character.charIntro, loginTextId: e.target.value } })}
                placeholder="Login Text ID..."
                defaultValue=""
                name="loginTextId"
                id="login-text-id"
              />
            </label>

            <label htmlFor="text1-en">
              {" "}
              Text 1 EN:
              <textarea
                className={TEXTAREA_STYLE}
                value={character?.charIntro?.text1En}
                onChange={(e) => setCharacter({ ...character, charIntro: { ...character.charIntro, text1En: e.target.value } })}
                placeholder="Text 1 EN..."
                defaultValue=""
                name="text1En"
                id="text1-en"
              />
            </label>

            <label htmlFor="text1-id">
              {" "}
              Text 1 ID:
              <textarea
                className={TEXTAREA_STYLE}
                value={character?.charIntro?.text1Id}
                onChange={(e) => setCharacter({ ...character, charIntro: { ...character.charIntro, text1Id: e.target.value } })}
                placeholder="Text 1 ID..."
                defaultValue=""
                name="text1Id"
                id="text1-id"
              />
            </label>

            <label htmlFor="text2-en">
              {" "}
              Text 2 EN:
              <textarea
                className={TEXTAREA_STYLE}
                value={character?.charIntro?.text2En}
                onChange={(e) => setCharacter({ ...character, charIntro: { ...character.charIntro, text2En: e.target.value } })}
                placeholder="Text 2 EN..."
                defaultValue=""
                name="text2En"
                id="text2-en"
              />
            </label>

            <label htmlFor="text2-id">
              {" "}
              Text 2 ID:
              <textarea
                className={TEXTAREA_STYLE}
                value={character?.charIntro?.text2Id}
                onChange={(e) => setCharacter({ ...character, charIntro: { ...character.charIntro, text2Id: e.target.value } })}
                placeholder="Text 2 ID..."
                defaultValue=""
                name="text2Id"
                id="text2-id"
              />
            </label>
            <label htmlFor="text3-en">
              {" "}
              Text 3 EN:
              <textarea
                className={TEXTAREA_STYLE}
                value={character?.charIntro?.text3En}
                onChange={(e) => setCharacter({ ...character, charIntro: { ...character.charIntro, text3En: e.target.value } })}
                placeholder="Text 3 EN..."
                defaultValue=""
                name="text3En"
                id="text3-en"
              />
            </label>

            <label htmlFor="text3-id">
              {" "}
              Text 3 ID:
              <textarea
                className={TEXTAREA_STYLE}
                value={character?.charIntro?.text3Id}
                onChange={(e) => setCharacter({ ...character, charIntro: { ...character.charIntro, text3Id: e.target.value } })}
                placeholder="Text 3 ID..."
                defaultValue=""
                name="text3Id"
                id="text3-id"
              />
            </label>
            <label htmlFor="text4-en">
              {" "}
              Text 4 EN:
              <textarea
                className={TEXTAREA_STYLE}
                value={character?.charIntro?.text4En}
                onChange={(e) => setCharacter({ ...character, charIntro: { ...character.charIntro, text4En: e.target.value } })}
                placeholder="Text 4 EN..."
                defaultValue=""
                name="text4En"
                id="text4-en"
              />
            </label>

            <label htmlFor="text4-id">
              {" "}
              Text 4 ID:
              <textarea
                className={TEXTAREA_STYLE}
                value={character?.charIntro?.text4Id}
                onChange={(e) => setCharacter({ ...character, charIntro: { ...character.charIntro, text4Id: e.target.value } })}
                placeholder="Text 4 ID..."
                defaultValue=""
                name="text4Id"
                id="text4-id"
              />
            </label>
          </>
        ) : (
          <p>Belum ada data infonya</p>
        )}
      </div>
    </>
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
