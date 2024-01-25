"use client";

import React from "react";
import { SectionWrapper } from "@/components/General/Wrapper";
import { Setting } from "./Setting";
import { PreviewSkill } from "./Preview";
import { useCharacterData } from "@/components/Evertale/Providers";

export default function CharPassiveSkills() {
  const { data, setData } = useCharacterData();
  const [deleteMode, setDeleteMode] = React.useState<boolean>(false);
  return (
    <SectionWrapper id="passive-skill-setting-container">
      <Setting data={data} setData={setData} setDeleteMode={setDeleteMode} deleteMode={deleteMode} />
      <PreviewSkill deleteMode={deleteMode} setDeleteMode={setDeleteMode} data={data} setData={setData} />
    </SectionWrapper>
  );
}
