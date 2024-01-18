import { Input } from "@/components/General/Input";
import { TitleSection } from "@/components/General/Wrapper";
import React, { RefObject } from "react";
import { Textarea } from "@/components/General/Textarea";
import { Button } from "@/components/General/Button";
import { TypeSkill } from "./TypeSkill";
import { notif } from "@/components/Utils";

export const Setting = ({
  deleteMode,
  setDeleteMode,
  data,
  setData,
}: {
  deleteMode: boolean;
  setDeleteMode: React.Dispatch<React.SetStateAction<boolean>>;
  data: Evertale.Character.State;
  setData: React.Dispatch<React.SetStateAction<Evertale.Character.State>>;
}) => {
  const [inputSkill, setInputSkill] = React.useState<Evertale.Character.PassiveSkill>({} as Evertale.Character.PassiveSkill);
  const [notifName, setNotifName] = React.useState<string>("");

  const nameRef: React.MutableRefObject<HTMLParagraphElement | null> = React.useRef<HTMLParagraphElement | null>(null);

  function changeHandler(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const element = e.target as HTMLInputElement | HTMLTextAreaElement;
    const field = element.getAttribute("data-passive") as string;

    setInputSkill({ ...inputSkill, [field]: element.value });
  }

  function addHandler(): void {
    if (!inputSkill.name) {
      notif(nameRef, "red", "Nama Passive belum diisi", setNotifName);
      return;
    }
    setData({ ...data, charPassiveSkill: [...data.charPassiveSkill, inputSkill] });
    setInputSkill({ name: "", typeSkill: [], descEn: "", descId: "" });
    console.log(data);
  }

  return (
    <div>
      <TitleSection>Character Passive Skill</TitleSection>

      <div>
        <Input forId="passive-skill-name" label="Passive Name" data-passive="name" value={inputSkill.name} onChange={changeHandler} />
        <p ref={nameRef} className="font-semibold">
          {notifName}
        </p>

        <TypeSkill inputSkill={inputSkill} setInputSkill={setInputSkill} />

        <Textarea forId="passive-desc-en" label="Description" data-passive="descEn" value={inputSkill.descEn} onChange={changeHandler} />

        <Textarea forId="passive-desc-id" label="Deskripsi" data-passive="descId" value={inputSkill.descId} onChange={changeHandler} />
      </div>

      {/* {!uniqueSkill && <NonUniqueSkill inputSkill={inputSkill} setInputSkill={setInputSkill} addHandler={addHandler} />} */}

      <Button variant="upload" onClick={addHandler}>
        Add
      </Button>

      <Button variant="danger" onClick={() => setDeleteMode(!deleteMode)}>
        {deleteMode ? "Batalkan" : "Hapus"}
      </Button>
    </div>
  );
};
