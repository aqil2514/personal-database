"use client";

import React, { RefObject, useRef, useState } from "react";
import { StateType, useData } from "..";
import { SectionWrapper, TitleSection } from "@/components/General/Wrapper";
import { Input } from "@/components/General/Input";
import { Textarea } from "@/components/General/Textarea";
import { Button } from "@/components/General/Button";
import { TypeSkill } from "./TypeSkill";
import { PreviewSkill } from "./Preview";
import { notif } from "@/components/Utils";

export default function CharActiveSkills() {
  const { data, setData }: StateType = useData();
  const [inputSkill, setInputSkill] = useState<Evertale.Character.ActiveSkill>({ name: "", typeSkill: [], target: "", TU: 0, spirit: 0, descEn: "", descId: "" });
  const [typeNotif, setTypeNotif] = useState<string>("");
  const [nameNotif, setNameNotif] = useState<string>("");
  const [deleteMode, setDeleteMode] = useState<boolean>(false);

  const typeRef = useRef<HTMLParagraphElement | null>(null);
  const nameRef = useRef<HTMLParagraphElement | null>(null);

  function addHandler() {
    if (!inputSkill.name) {
      window.scrollTo({
        top: nameRef.current?.offsetTop,
        behavior: "smooth",
      });
      notif(nameRef, "red", "Nama skill belum diisi", setNameNotif);
      return;
    }
    if (inputSkill.typeSkill.length === 0) {
      window.scrollTo({
        top: typeRef.current?.offsetTop,
        behavior: "smooth",
      });
      notif(typeRef, "red", "TypeSkill belum dipilih / difiksasi", setTypeNotif);
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

    setInputSkill({ name: "", typeSkill: [], target: "", TU: 0, spirit: 0, descEn: "", descId: "" });
  }

  function changeHandler(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field: string | null = e.target.getAttribute("data-field");
    if (typeof field !== "string") {
      return;
    }
    setInputSkill({ ...inputSkill, [field]: e.target.value });
  }

  return (
    <SectionWrapper id="active-skill-section">
      <TitleSection>Character Active Skill</TitleSection>

      <Input forId="active-skill-name" label="Skill Name" data-field="name" value={inputSkill?.name} onChange={changeHandler} />
      <p ref={nameRef} className="font-semibold">
        {nameNotif}
      </p>

      <TypeSkill setInputSkill={setInputSkill} inputSkill={inputSkill} />
      <p ref={typeRef} className="font-semibold">
        {typeNotif}
      </p>

      <Input forId="active-skill-spirit" label="Skill Spirit" type="number" data-field="spirit" value={inputSkill?.spirit} onChange={changeHandler} />

      <Input forId="active-skill-target" label="Skill Target" data-field="target" value={inputSkill?.target} onChange={changeHandler} />

      <Input forId="active-skill-tu" label="Skill TU" type="number" data-field="TU" value={inputSkill?.TU} onChange={changeHandler} />

      <Textarea forId="active-skill-desc-en" label="Skill Description" data-field="descEn" value={inputSkill?.descEn} onChange={changeHandler} />

      <Textarea forId="active-skill-desc-id" label="Deskripsi Skill" data-field="descId" value={inputSkill?.descId} onChange={changeHandler} />

      <Button type="button" onClick={addHandler} variant="upload">
        Add
      </Button>
      <Button variant="danger" type="button" onClick={() => setDeleteMode(!deleteMode)}>
        {deleteMode ? "Batalkan" : "Hapus"}
      </Button>

      <PreviewSkill deleteMode={deleteMode} setDeleteMode={setDeleteMode} data={data} setData={setData} />
    </SectionWrapper>
  );
}
