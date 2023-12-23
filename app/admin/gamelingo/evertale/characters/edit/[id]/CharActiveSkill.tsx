import useSWR from "swr";
import { ADD_BUTTON_STYLE, INPUT_STYLE, SECTION_STYLE, SECTION_TITLE_STYLE, TEXTAREA_STYLE, useCharacter } from "./form";
import axios from "axios";
import { useState } from "react";
import { PlusCircleFill, XCircleFill } from "react-bootstrap-icons";
import { useRouter } from "next/navigation";

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());
export default function ActiveSkill() {
  const URL = "/api/gamelingo/newEvertale?category=statusResource";

  const { data, isLoading, error } = useSWR(URL, fetcher);
  const { character, setCharacter } = useCharacter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isAddMode, setIsAddMode] = useState<Boolean>(false);
  const router = useRouter();

  return (
    <div id="character-images" className={SECTION_STYLE}>
      <h3 className={SECTION_TITLE_STYLE}>Character Active Skills</h3>
      {character?.charActiveSkill?.map((nas: any, i: number) => (
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
                  charActiveSkill: [
                    ...character.charActiveSkill.slice(0, i),
                    {
                      ...character.charActiveSkill[i],
                      skillName: e.target.value,
                    },
                    ...character.charActiveSkill.slice(i + 1),
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
              value={nas?.skillSpirit}
              onChange={(e) => {
                setCharacter({
                  ...character,
                  charActiveSkill: [
                    ...character.charActiveSkill.slice(0, i),
                    {
                      ...character.charActiveSkill[i],
                      skillSpirit: e.target.value,
                    },
                    ...character.charActiveSkill.slice(i + 1),
                  ],
                });
              }}
              type="text"
              name="charName"
              id={`active-skill-name-${i + 1}`}
              required
            />
          </label>
          <div id="skill-type">
            <h3>Skill Type</h3>
            <div id="active-skill-type-container" className="flex flex-wrap flex-row border-2 border-black border-solid justify-start w-full rounded h-[100px] overflow-y-scroll">
              <input type="text" name="search" id="search" placeholder="Cari Skill Type..." className="block w-full px-2" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              {data?.rss?.typeActiveSkill
                ?.filter((type: string) => type.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((type: string, index: number) => (
                  <label className="mx-2 my-2" htmlFor={type + i + 1} key={`passive-skill-${i}-type-${index++}`}>
                    <input className="mx-2" type="checkbox" defaultChecked={nas?.typeSkill.find((q: string) => q === type)} data-active-skill={i + 1} name={`active-skill-${i}-type-${index++}`} id={type + i + 1} value={type} />
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
                    const isDuplicate = data?.rss?.typeActiveSkill?.find((keyword: string) => keyword.toLowerCase() === e.currentTarget.value.toLocaleLowerCase());
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
                        type: "active-skill-type",
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
                const els = document.querySelectorAll(`#active-skill-type-container label input[data-active-skill="${i + 1}"]`);
                const value: string[] = [];
                els.forEach((el: any) => {
                  if (el.checked) {
                    value.push(el.value);
                  }
                });
                alert(`${value.length} buah opsi telah dipilih sebagai Active Skill Type: ${value.join(", ")}`);
                setCharacter({
                  ...character,
                  charActiveSkill: [
                    ...character.charActiveSkill.slice(0, i),
                    {
                      ...character.charActiveSkill[i],
                      typeSkill: value,
                    },
                    ...character.charActiveSkill.slice(i + 1),
                  ],
                });
              }}
            >
              Fiksasi
            </button>
          </div>
          <label htmlFor={`active-skill-target-${i + 1}`}>
            Skill Target :{" "}
            <input
              className={INPUT_STYLE}
              value={nas?.skillTarget}
              onChange={(e) => {
                setCharacter({
                  ...character,
                  charActiveSkill: [
                    ...character.charActiveSkill.slice(0, i),
                    {
                      ...character.charActiveSkill[i],
                      skillTarget: e.target.value,
                    },
                    ...character.charActiveSkill.slice(i + 1),
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
              value={nas?.skillTu}
              onChange={(e) => {
                setCharacter({
                  ...character,
                  charActiveSkill: [
                    ...character.charActiveSkill.slice(0, i),
                    {
                      ...character.charActiveSkill[i],
                      skillTu: e.target.value,
                    },
                    ...character.charActiveSkill.slice(i + 1),
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
              value={nas?.skillDescEn}
              onChange={(e) => {
                setCharacter({
                  ...character,
                  charActiveSkill: [
                    ...character.charActiveSkill.slice(0, i),
                    {
                      ...character.charActiveSkill[i],
                      skillDescEn: e.target.value,
                    },
                    ...character.charActiveSkill.slice(i + 1),
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
              value={nas?.skillDescId}
              onChange={(e) => {
                setCharacter({
                  ...character,
                  charActiveSkill: [
                    ...character.charActiveSkill.slice(0, i),
                    {
                      ...character.charActiveSkill[i],
                      skillDescId: e.target.value,
                    },
                    ...character.charActiveSkill.slice(i + 1),
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
