"use client";

import { useState } from "react";
import { useData } from "./formbody";
import { SECTION_STYLE, SECTION_TITLE_STYLE, INPUT_STYLE, TEXTAREA_STYLE, ADD_BUTTON_STYLE, ICON_DELETE_STYLE, DELETE_BUTTON_STYLE } from "@/app/components/Styles";
import { activeSkillsType } from "../../component/data";

type ActiveSkillState = {
  skillName: string;
  typeSkill: string[];
  skillTarget: string;
  skillTu: number;
  skillSpirit: number;
  skillDescEn: string;
  skillDescId: string;
};

export default function CharActiveSkills() {
  const { data, setData } = useData();
  const [inputSkill, setInputSkill] = useState<ActiveSkillState>({ skillName: "", typeSkill: [""], skillTarget: "", skillTu: 0, skillSpirit: 0, skillDescEn: "", skillDescId: "" });
  const [deleteMode, setDeleteMode] = useState<Boolean>(false);

  const addHandler = () => {
    if (inputSkill.typeSkill[0].length === 0) {
      alert("Tipe Skill belum dipilih / difiksasi");
      return;
    }
    if (Array.isArray(data.charActiveSkill)) {
      setData({
        ...data,
        charActiveSkill: [...data.charActiveSkill, { ...inputSkill }],
      });
    } else {
      setData({
        ...data,
        charActiveSkill: [{ ...inputSkill }],
      });
    }
    const els = document.querySelectorAll("#active-skill-type-container label input");
    els.forEach((el: any) => {
      el.checked = false;
    });
    setInputSkill({ skillName: "", typeSkill: [""], skillTarget: "", skillTu: 0, skillSpirit: 0, skillDescEn: "", skillDescId: "" });
  };

  const deleteHandler = (i: number) => {
    const updatedSkills = data.charActiveSkill.filter((_: any, index: number) => index !== i - 1);

    setData({ ...data, charActiveSkill: updatedSkills });
  };

  return (
    <div id="char-active-skill" className={SECTION_STYLE}>
      {/* Setting Skills  */}
      <div>
        <h3 className={SECTION_TITLE_STYLE}>Character Active Skill</h3>
        <label htmlFor="skill-name">
          Skill Name :
          <input className={INPUT_STYLE} value={inputSkill.skillName} onChange={(e) => setInputSkill({ ...inputSkill, skillName: e.target.value })} type="text" name="skillName" id="skill-name" />
        </label>
        <div id="skill-type">
          <h3>Skill Type</h3>
          <div id="active-skill-type-container" className="flex flex-nowrap flex-row justify-evenly">
            {activeSkillsType.map((type: string, i: number) => (
              <label htmlFor={type} key={`active-skill-type-${i++}`}>
                <input className="mx-2" type="checkbox" name={`active-skill-type-${i++}`} id={type} value={type} />
                {type}
              </label>
            ))}
          </div>
          <button
            className={ADD_BUTTON_STYLE + " block"}
            type="button"
            onClick={() => {
              const els = document.querySelectorAll("#active-skill-type-container label input");
              const value: string[] = [];
              els.forEach((el: any) => {
                if (el.checked) {
                  value.push(el.value);
                }
              });
              setInputSkill({ ...inputSkill, typeSkill: value });
            }}
          >
            Fiksasi
          </button>
        </div>
        <label htmlFor="skill-spirit">
          Spirit :
          <input className={INPUT_STYLE} value={inputSkill.skillSpirit} onChange={(e) => setInputSkill({ ...inputSkill, skillSpirit: Number(e.target.value) })} type="number" name="spirit" id="skill-spirit" />
        </label>
        <label htmlFor="skill-target">
          Target :
          <input className={INPUT_STYLE} value={inputSkill.skillTarget} onChange={(e) => setInputSkill({ ...inputSkill, skillTarget: e.target.value })} type="text" name="target" id="skill-target" />
        </label>
        <label htmlFor="skill-tu">
          TU :
          <input className={INPUT_STYLE} value={inputSkill.skillTu} onChange={(e) => setInputSkill({ ...inputSkill, skillTu: Number(e.target.value) })} type="number" name="TU" id="skill-tu" />
        </label>
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
        {data.charActiveSkill.length === 0 ? (
          <p>Belum ada data yang ditambahkan</p>
        ) : (
          <>
            {data.charActiveSkill.map((as: ActiveSkillState, i: number) => (
              <div key={`as-${i++}`} className="my-4">
                <p>
                  <strong>Active Skill {i + 1}.</strong>{" "}
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
                  <strong>Skill Target : </strong>
                  {as.skillTarget}
                </p>
                <p>
                  <strong>Skill Spirit : </strong>
                  {as.skillSpirit}
                </p>
                <p>
                  <strong>Skill TU : </strong>
                  {as.skillTu}
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
