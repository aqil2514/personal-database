import useSWR from "swr";
import { ADD_BUTTON_STYLE, INPUT_STYLE, SECTION_STYLE, SECTION_TITLE_STYLE, TEXTAREA_STYLE, useCharacter } from "./form";
import { useState } from "react";
import { PlusCircleFill, XCircleFill } from "react-bootstrap-icons";
import axios from "axios";
import { useRouter } from "next/navigation";

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());
export default function PassiveSkill() {
  const URL = "/api/gamelingo/newEvertale?category=statusResource";
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isAddMode, setIsAddMode] = useState<Boolean>(false);

  const { data, isLoading, error } = useSWR(URL, fetcher);
  const { character, setCharacter } = useCharacter();
  const router = useRouter();

  return (
    <div id="character-images" className={SECTION_STYLE}>
      <h3 className={SECTION_TITLE_STYLE}>Character Passive Skills</h3>
      {character?.charPassiveSkill?.map((nps: any, i: number) => (
        <div key={`passive-skill-${i + 1}`}>
          <p>
            <strong>Passive Skill {i + 1}</strong>
          </p>
          <label htmlFor={`passive-skill-name-${i + 1}`}>
            Skill Name :{" "}
            <input
              className={INPUT_STYLE}
              value={nps?.skillName}
              onChange={(e) => {
                setCharacter({
                  ...character,
                  charPassiveSkill: [
                    ...character.charPassiveSkill.slice(0, i),
                    {
                      ...character.charPassiveSkill[i],
                      skillName: e.target.value,
                    },
                    ...character.charPassiveSkill.slice(i + 1),
                  ],
                });
              }}
              type="text"
              name="charName"
              id={`passive-skill-name-${i + 1}`}
              required
            />
          </label>
          <div id="skill-type">
            <h3>Skill Type</h3>
            <div id="passive-skill-type-container" className="flex flex-wrap flex-row border-2 border-black border-solid justify-start w-full rounded h-[100px] overflow-y-scroll">
              <input type="text" name="search" id="search" placeholder="Cari Skill Type..." className="block w-full px-2" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              {data?.rss?.typePassiveSkill
                ?.filter((type: string) => type.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((type: string, index: number) => (
                  <label className="mx-2 my-2" htmlFor={type + i + 1} key={`passive-skill-${i}-type-${index++}`}>
                    <input className="mx-2" type="checkbox" checked={nps?.typeSkill.find((q: string) => q === type)} data-passive-skill={i + 1} name={`passive-skill-${i}-type-${index++}`} id={type + i + 1} value={type} />
                    {type}
                  </label>
                ))}
            </div>
            <div className="cursor-pointer" onClick={() => setIsAddMode(!isAddMode)}>
              {isAddMode ? <XCircleFill className="inline-block" /> : <PlusCircleFill className="inline-block" />}
              <p className="inline-block my-auto mx-2">{isAddMode ? "Batal (Tekan CTRL + Enter untuk menambah data)" : "Tambah Skill Type"}</p>
            </div>
            {isAddMode && (
              <input
                type="text"
                name="input-new-skill-type"
                placeholder="Nama skill type..."
                className="mx-2 w-1/6"
                onKeyDown={(e) => {
                  if (e.ctrlKey && e.key === "Enter") {
                    const isDuplicate = data?.rss?.typePassiveSkill?.find((keyword: string) => keyword.toLowerCase() === e.currentTarget.value.toLocaleLowerCase());
                    if (isDuplicate) {
                      alert("Skill type telah tersedia");
                      return;
                    }
                    const sure = confirm(`Yakin ingin tambahkan Skill Type baru dengan nama "${e.currentTarget.value}" ?`);
                    if (!sure) {
                      return;
                    }
                    axios
                      .put("/api/gamelingo/newEvertale", {
                        data: e.currentTarget.value,
                        type: "passive-skill-type",
                      })
                      .then((res) => {
                        alert(res.data.msg);
                        e.currentTarget.value = "";
                        router.refresh();
                      })
                      .catch((error) => console.log(error));
                  } else if (e.key === "Escape") {
                    setIsAddMode(false);
                  }
                }}
              />
            )}
            <button
              className={ADD_BUTTON_STYLE + " block"}
              type="button"
              onClick={() => {
                const els = document.querySelectorAll(`#passive-skill-type-container label input[data-passive-skill="${i + 1}"]`);
                const value: string[] = [];
                els.forEach((el: any) => {
                  if (el.checked) {
                    value.push(el.value);
                  }
                });
                setCharacter({
                  ...character,
                  charPassiveSkill: [
                    ...character.charPassiveSkill.slice(0, i),
                    {
                      ...character.charPassiveSkill[i],
                      typeSkill: value,
                    },
                    ...character.charPassiveSkill.slice(i + 1),
                  ],
                });
              }}
            >
              Fiksasi
            </button>
          </div>
          <label htmlFor="passive-desc-en">
            Description :
            <textarea
              className={TEXTAREA_STYLE}
              value={nps?.skillDescEn}
              onChange={(e) => {
                setCharacter({
                  ...character,
                  charPassiveSkill: [
                    ...character.charPassiveSkill.slice(0, i),
                    {
                      ...character.charPassiveSkill[i],
                      skillDescEn: e.target.value,
                    },
                    ...character.charPassiveSkill.slice(i + 1),
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
              value={nps?.skillDescId}
              onChange={(e) => {
                setCharacter({
                  ...character,
                  charPassiveSkill: [
                    ...character.charPassiveSkill.slice(0, i),
                    {
                      ...character.charPassiveSkill[i],
                      skillDescId: e.target.value,
                    },
                    ...character.charPassiveSkill.slice(i + 1),
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
