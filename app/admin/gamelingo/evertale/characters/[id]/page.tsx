"use client";

import { useParams } from "next/navigation";
import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CharacterContext = createContext(null);
const FIGURE_STYLE = "my-4 text-center";
const IMAGE_STYILE = "max-w-screen-sm rounded block mx-auto";
const SECTION_TITLE_STYLE = "font-merriweather text-center font-bold mt-5 text-xl";
const P_STYLE1 = "font-poppins";

export default function Detail() {
  const { id } = useParams();
  const [character, setCharacter] = useState<React.ComponentState>();
  const [loading, setLoading] = useState<false | true>(false);
  const router = useRouter();

  async function getData() {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/gamelingo/evertale");

      const characters = data.chars;
      const selected = characters?.chars?.find((char: React.ComponentState) => char._id === id);

      console.log(selected);
      setCharacter(selected);
      document.title = `Personal Database - ${selected.charStatus.charName}`;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!character) {
      getData();
    }
  }, []);

  return loading ? (
    <p className={P_STYLE1}>Memuat Data...</p>
  ) : (
    <CharacterContext.Provider value={character}>
      <div className="p-10 w-full">
        <span onClick={router.back} className="bg-emerald-600 cursor-pointer px-4 py-2 rounded font-bold text-white">
          &lt;
        </span>
        <h1 className="text-center font-merriweather font-bold">{character?.charStatus?.charName}</h1>
        <figure className={FIGURE_STYLE}>
          <Image className={IMAGE_STYILE} width={720} height={720} src={character?.charImage?.f1Img} alt={character?.charStatus?.charName} />
          <figcaption>{character?.charStatus?.charName + " Form 1"}</figcaption>
        </figure>
        {character?.charImage?.f2Img && (
          <figure className={FIGURE_STYLE}>
            <Image className={IMAGE_STYILE} width={720} height={720} src={character?.charImage?.f2Img} alt={character?.charStatus?.charName} />
            <figcaption>{character?.charStatus?.charName + " Form 2"}</figcaption>
          </figure>
        )}
        {character?.charImage?.f3Img && (
          <figure className={FIGURE_STYLE}>
            <Image className={IMAGE_STYILE} width={720} height={720} src={character?.charImage?.f3Img} alt={character?.charStatus?.charName} />
            <figcaption>{character?.charStatus?.charName + " Form 3"}</figcaption>
          </figure>
        )}
        {character?.charIntro && Object.keys(character.charIntro).length > 0 && <CharIntro />}
        <CharStatus />
        <CharProfile />
        <CharActiveSkill />
        <CharPassiveSkill />
      </div>
    </CharacterContext.Provider>
  );
}

function CharIntro() {
  const character = useContext<React.ComponentState>(CharacterContext);
  return (
    <div>
      <h2 className={SECTION_TITLE_STYLE}>Character Intro</h2>
      {character?.charIntro?.gachaIntroEn && (
        <>
          <p className={P_STYLE1}>
            <strong>Gacha Intro EN : </strong>
            {character?.charIntro?.gachaIntroEn}
          </p>
          <p className={P_STYLE1}>
            <strong>Gacha Intro ID : </strong>
            {character?.charIntro?.gachaIntroId}
          </p>
        </>
      )}
      {character?.charIntro?.gachaTextEn && (
        <>
          <p className={P_STYLE1}>
            <strong>Gacha Text EN : </strong>
            {character?.charIntro?.gachaTextEn}
          </p>
          <p className={P_STYLE1}>
            <strong>Gacha Text ID : </strong>
            {character?.charIntro?.gachaTextId}
          </p>
        </>
      )}
      {character?.charIntro?.loginTextEn && (
        <>
          <p className={P_STYLE1}>
            <strong>Login Text EN : </strong>
            {character?.charIntro?.loginTextEn}
          </p>
          <p className={P_STYLE1}>
            <strong>Login Text ID : </strong>
            {character?.charIntro?.loginTextId}
          </p>
        </>
      )}
      {character?.charIntro?.text1En && (
        <>
          <p className={P_STYLE1}>
            <strong>Text 1 EN : </strong>
            {character?.charIntro?.text1En}
          </p>
          <p className={P_STYLE1}>
            <strong>Text 1 ID : </strong>
            {character?.charIntro?.text1Id}
          </p>
        </>
      )}
      {character?.charIntro?.text2En && (
        <>
          <p className={P_STYLE1}>
            <strong>Text 2 EN : </strong>
            {character?.charIntro?.text2En}
          </p>
          <p className={P_STYLE1}>
            <strong>Text 2 ID : </strong>
            {character?.charIntro?.text2Id}
          </p>
        </>
      )}
      {character?.charIntro?.text3En && (
        <>
          <p className={P_STYLE1}>
            <strong>Text 3 EN : </strong>
            {character?.charIntro?.text3En}
          </p>
          <p className={P_STYLE1}>
            <strong>Text 3 ID : </strong>
            {character?.charIntro?.text3Id}
          </p>
        </>
      )}
      {character?.charIntro?.text4En && (
        <>
          <p className={P_STYLE1}>
            <strong>Text 4 EN : </strong>
            {character?.charIntro?.text4En}
          </p>
          <p className={P_STYLE1}>
            <strong>Text 4 ID : </strong>
            {character?.charIntro?.text4Id}
          </p>
        </>
      )}
    </div>
  );
}

function CharStatus() {
  const character = useContext<React.ComponentState>(CharacterContext);
  const [leaderSkill, setLeaderSkill] = useState<React.ComponentState>();
  const [loading, setLoading] = useState<false | true>(false);
  async function getData() {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/gamelingo/evertale");

      const dataLeaderSkill = data.leaderskills.leaderskills;

      const selected = dataLeaderSkill.find((dls: React.ComponentState) => dls.name === character?.charStatus?.leaderSkill);

      setLeaderSkill(selected);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (!leaderSkill) {
      getData();
    }
  }, []);

  return (
    <div>
      <h2 className={SECTION_TITLE_STYLE}>Character Status</h2>
      <p className={P_STYLE1}>
        <strong>Unit Name : </strong>
        {character?.charStatus?.charName}
      </p>
      <p className={P_STYLE1}>
        <strong>Unit Link : </strong>
        {character?.charStatus?.charLink}
      </p>
      <p className={P_STYLE1}>
        <strong>Unit Element : </strong>
        {character?.charStatus?.statusElement}
      </p>
      {character?.charStatus?.leaderSkill !== "null" && (
        <>
          <p className={P_STYLE1}>
            <strong>Unit Leader Skill : </strong>
            {character?.charStatus?.leaderSkill}
          </p>
          {
            <p className={P_STYLE1}>
              <strong>Leader Skill Description : </strong>
              {loading ? "Memuat Data..." : leaderSkill?.descEN}
            </p>
          }
          <p className={P_STYLE1}>
            <strong>Deskripsi Leader Skill : </strong>
            {loading ? "Memuat Data..." : leaderSkill?.descID}
          </p>
        </>
      )}
      <p className={P_STYLE1}>
        <strong>Unit Weapon : </strong>
        {character?.charStatus?.firstWeapon}
        {character?.charStatus?.secondWeapon !== "Select Second Weapon" && " & " + character?.charStatus?.secondWeapon}
      </p>
      {character?.charStatus?.conjures !== "null" && (
        <p className={P_STYLE1}>
          <strong>Unit Conjures : </strong>
          {character?.charStatus?.conjures}
        </p>
      )}
    </div>
  );
}

function CharProfile() {
  const character = useContext<React.ComponentState>(CharacterContext);
  return (
    <div>
      <h2 className={SECTION_TITLE_STYLE}>Character Profile</h2>
      <article>
        {" "}
        <strong className={P_STYLE1}>Part 1 EN : </strong>
        <p className={P_STYLE1}>{character?.charProfile?.part1En}</p>
      </article>
      <article>
        {" "}
        <strong className={P_STYLE1}>Part 1 ID : </strong>
        <p className={P_STYLE1}>{character?.charProfile?.part1Id}</p>
      </article>
      {character?.charProfile?.part2En && (
        <>
          <article>
            {" "}
            <strong className={P_STYLE1}>Part 2 EN : </strong>
            <p className={P_STYLE1}>{character?.charProfile?.part2En}</p>
          </article>
          <article>
            {" "}
            <strong className={P_STYLE1}>Part 2 ID : </strong>
            <p className={P_STYLE1}>{character?.charProfile?.part2Id}</p>
          </article>
        </>
      )}
      {character?.charProfile?.part3En && (
        <>
          <article>
            {" "}
            <strong className={P_STYLE1}>Part 3 EN : </strong>
            <p className={P_STYLE1}>{character?.charProfile?.part3En}</p>
          </article>
          <article>
            {" "}
            <strong className={P_STYLE1}>Part 3 ID : </strong>
            <p className={P_STYLE1}>{character?.charProfile?.part3Id}</p>
          </article>
        </>
      )}
    </div>
  );
}

function CharActiveSkill() {
  const character = useContext<React.ComponentState>(CharacterContext);
  return (
    <div>
      <h2 className={SECTION_TITLE_STYLE}>Character Active Skills</h2>
      {character?.nASkill?.map((ns: React.ComponentState, i: number) => (
        <ul key={i++} className={`my-6 ${P_STYLE1}`}>
          <li>
            <strong>Active Skill {i + 1}</strong>
          </li>
          <li>
            <strong>Skill Name : </strong>
            {ns?.skillName}
          </li>
          <li>
            <strong>Spirit : </strong>
            {ns?.spirit}
          </li>
          <li>
            <strong>Target : </strong>
            {ns?.target}
          </li>
          <li>
            <strong>TU : </strong>
            {ns?.TU}
          </li>
          <li>
            <strong>Description : </strong>
            <p>{ns?.descEn}</p>
          </li>
          <li>
            <strong>Deskripsi : </strong>
            <p>{ns?.descId}</p>
          </li>
        </ul>
      ))}
    </div>
  );
}

function CharPassiveSkill() {
  const character = useContext<React.ComponentState>(CharacterContext);
  return (
    <div>
      <h2 className={SECTION_TITLE_STYLE}>Character Passive Skill</h2>
      {character?.nPSkill?.map((nps: React.ComponentState, i: number) => (
        <ul key={`passive-${i++}`} className={`py-4 ${P_STYLE1}`}>
          <li>
            <strong>Passive Skill {i + 1}</strong>
          </li>
          <li>
            <strong>Passive Name : </strong> {nps?.name}
          </li>
          <li>
            <strong>Description : </strong>
            <p>{nps?.descEN}</p>
          </li>
          <li>
            <strong>Deskripsi : </strong>
            <p>{nps?.descID}</p>
          </li>
        </ul>
      ))}
    </div>
  );
}
