"use client";

import React, { useState } from "react";
import { SECTION_STYLE, SECTION_TITLE_STYLE, INPUT_STYLE, TEXTAREA_STYLE, ADD_BUTTON_STYLE, ICON_DELETE_STYLE, DELETE_BUTTON_STYLE } from "@/app/components/Styles";
import { passiveSkillsType } from "../../../component/data";
import { useData } from "../formbody";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { PlusCircleFill, XCircleFill } from "react-bootstrap-icons";
import axios from "axios";

type PassiveSkillState = {
  skillName: string;
  typeSkill: string[];
  skillDescEn: string;
  skillDescId: string;
};

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

const TypeSkill = ({ inputSkill, setInputSkill }: any) => {
  const URL = "/api/gamelingo/newEvertale?category=statusResource";
  const [isAddMode, setIsAddMode] = React.useState(false);
  const { data, isLoading, error } = useSWR(URL, fetcher);
  const router = useRouter();

  if (!data || isLoading) return <p>Mengambil data...</p>;
  if (error) return <p>Error...</p>;
  return (
    <div id="PassiveSkill">
      Passive Skill Type:
      <div className="flex flex-wrap flex-row border-2 border-black border-solid justify-start w-full rounded-xl h-1/6 overflow-y-scroll">
        {data.rss.typePassiveSkill.map((type: string, i: number) => (
          <label htmlFor={type} key={i++}>
            <input className="ml-4 mr-2" type="checkbox" name={`passive-skill-type-${i++}`} value={type} id={type} />
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
                alert("Tipe Passive Skill telah tersedia");
                return;
              }
              const sure = confirm(`Yakin ingin tambahkan Passive Sill Type baru dengan nama "${e.currentTarget.value}" ?`);
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
          const els = document.querySelectorAll("#PassiveSkill label input");
          const value: string[] = [];
          els.forEach((el: any) => {
            if (el.checked) {
              value.push(el.value);
            }
          });
          alert(`${value.length} buah Type passive Skill telah dipilih : "${value.join(", ")}"`);
          setInputSkill({ ...inputSkill, typeSkill: value });
        }}
      >
        Fiksasi
      </button>
    </div>
  );
};

export default function CharPassiveSkills() {
  const { data, setData } = useData();
  const [inputSkill, setInputSkill] = useState<PassiveSkillState>({
    skillName: "",
    typeSkill: [],
    skillDescEn: "",
    skillDescId: "",
  });

  const [deleteMode, setDeleteMode] = useState<Boolean>(false);

  const addHandler = () => {
    if (inputSkill.typeSkill.length === 0) {
      alert("Tipe Skill belum dipilih / difiksasi");
      return;
    }
    if (Array.isArray(data.charPassiveSkill)) {
      setData({
        ...data,
        charPassiveSkill: [...data.charPassiveSkill, { ...inputSkill }],
      });
    } else {
      setData({
        ...data,
        charPassiveSkill: [{ ...inputSkill }],
      });
    }
    const els = document.querySelectorAll("#passive-skill-type-container label input");
    els.forEach((el: any) => {
      el.checked = false;
    });
    setInputSkill({ skillName: "", typeSkill: [], skillDescEn: "", skillDescId: "" });
  };

  const deleteHandler = (i: number) => {
    const updatedSkills = data.charPassiveSkill.filter((_: any, index: number) => index !== i - 1);

    setData({ ...data, charPassiveSkill: updatedSkills });
  };

  return (
    <div id="char-passive-skill" className={SECTION_STYLE}>
      {/* Setting Skills  */}
      <div>
        <h3 className={SECTION_TITLE_STYLE}>Character Passive Skill</h3>
        <label htmlFor="skill-name">
          Skill Name :
          <input className={INPUT_STYLE} value={inputSkill.skillName} onChange={(e) => setInputSkill({ ...inputSkill, skillName: e.target.value })} type="text" name="skillName" id="skill-name" />
        </label>
        <TypeSkill inputSkill={inputSkill} setInputSkill={setInputSkill} />

        <label htmlFor="desc-en">
          Description :
          <textarea className={TEXTAREA_STYLE} value={inputSkill.skillDescEn} onChange={(e) => setInputSkill({ ...inputSkill, skillDescEn: e.target.value })} name="descEn" id="desc-en" />
        </label>
        <label htmlFor="desc-id">
          Deskripsi :
          <textarea
            className={TEXTAREA_STYLE}
            value={inputSkill.skillDescId}
            onChange={(e) => setInputSkill({ ...inputSkill, skillDescId: e.target.value })}
            name="descId"
            id="desc-id"
            onKeyDown={(e) => {
              if (e.ctrlKey && e.key === "Enter") {
                addHandler();
              }
            }}
          />
          <p className="block">(CTRL + Enter untuk menambah state)</p>
        </label>
        <button type="button" onClick={addHandler} className={ADD_BUTTON_STYLE}>
          Add
        </button>
        <button type="button" className={DELETE_BUTTON_STYLE} onClick={() => setDeleteMode(!deleteMode)}>
          {deleteMode ? "Batalkan" : "Hapus"}
        </button>
      </div>

      {/* Tampilan Skills  */}
      <div>
        {data.charPassiveSkill.length === 0 ? (
          <p>Belum ada data yang ditambahkan</p>
        ) : (
          <>
            {data.charPassiveSkill.map((as: PassiveSkillState, i: number) => (
              <div key={`as-${i++}`} className="my-4">
                <p>
                  <strong>Passive Skill {i + 1}.</strong>{" "}
                  {deleteMode && (
                    <span onClick={() => deleteHandler(i)} className={ICON_DELETE_STYLE + " font-extrabold"}>
                      X
                    </span>
                  )}
                </p>
                <p>
                  <strong>Skill Name : </strong>
                  {as.skillName}
                </p>
                <p>
                  <strong>Skill Type : </strong>
                  {as.typeSkill.join(", ")}
                </p>
                <p>
                  <strong>Description : </strong>
                  {as.skillDescEn}
                </p>
                <p>
                  <strong>Deskripsi : </strong>
                  {as.skillDescId}
                </p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
