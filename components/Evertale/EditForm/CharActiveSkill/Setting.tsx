import React, { SetStateAction } from "react";
import { useCharacter } from "..";
import { Input } from "@/components/General/Input";
import { Textarea } from "@/components/General/Textarea";
import { TypeSkill } from "./TypeSkill";

export default function Setting({ char, setChar }: { char: Evertale.Character.State; setChar: React.Dispatch<SetStateAction<Evertale.Character.State>> }) {
  const charAS: Evertale.Character.ActiveSkill[] = char.charActiveSkill;

  function changeHandler(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, i: number, field: keyof Evertale.Character.ActiveSkill) {
    const updatedCharActiveSkill = [...char.charActiveSkill]; // Salin array charActiveSkill
    const updatedSkill = { ...updatedCharActiveSkill[i], [field]: e.target.value }; // Salin objek yang ingin diperbarui

    updatedCharActiveSkill[i] = updatedSkill; // Perbarui objek di indeks tertentu

    setChar({ ...char, charActiveSkill: updatedCharActiveSkill }); // Terapkan pembaruan ke state
  }
  let index = 0;
  return (
    <div>
      <ul>
        {charAS.map((as: Evertale.Character.ActiveSkill, i: number) => {
          return (
            <li key={`active-skill-${index++}`}>
              <h3 className="my-4 block underline font-bold text-2xl">Active Skill</h3>
              <Input forId={`skillName-${index++}`} label="Skill Name" value={as.skillName} onChange={(e) => changeHandler(e, i, "skillName")} />
              <TypeSkill index={i} char={char} setChar={setChar} />
              <Input forId={`skillSpirit-${index++}`} label="Skill Spirit" value={as.skillSpirit} onChange={(e) => changeHandler(e, i, "skillSpirit")} />
              <Input forId={`skillTu-${index++}`} label="Skill Tu" value={as.skillTu} onChange={(e) => changeHandler(e, i, "skillTu")} />
              <Input forId={`skillTarget-${index++}`} label="Skill Target" value={as.skillTarget} onChange={(e) => changeHandler(e, i, "skillTarget")} />
              <Textarea forId={`skillDescription-${index++}`} label="Skill Description" value={as.skillDescEn} onChange={(e) => changeHandler(e, i, "skillDescEn")} />
              <Textarea forId={`skillDeskripsi-${index++}`} label="Skill Deskripsi" value={as.skillDescId} onChange={(e) => changeHandler(e, i, "skillDescId")} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
