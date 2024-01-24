import React, { SetStateAction } from "react";
import { Input } from "@/components/General/Input";
import { Textarea } from "@/components/General/Textarea";
import { TypeSkill } from "./TypeSkill";

export default function Setting({ char, setChar }: { char: Evertale.Character.State; setChar: React.Dispatch<SetStateAction<Evertale.Character.State>> }) {
  const charPS: Evertale.Character.PassiveSkill[] = char.charPassiveSkill;

  function changeHandler(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, i: number, field: keyof Evertale.Character.PassiveSkill) {
    const updatedCharPassiveSkill = [...char.charPassiveSkill];
    const updatedSkill = { ...updatedCharPassiveSkill[i], [field]: e.target.value };

    updatedCharPassiveSkill[i] = updatedSkill;

    setChar({ ...char, charPassiveSkill: updatedCharPassiveSkill });
  }
  let index = 0;
  return (
    <div>
      <ul>
        {charPS.map((ps: Evertale.Character.PassiveSkill, i: number) => {
          return (
            <li key={`active-skill-${index++}`}>
              <h3 className="my-4 block underline font-bold text-2xl">Passive Skill</h3>
              <Input forId={`passive-skillName-${index++}`} label="Skill Name" value={ps.skillName} onChange={(e) => changeHandler(e, i, "skillName")} />
              <TypeSkill index={i} char={char} setChar={setChar} />
              <Textarea forId={`passive-skillDescription-${index++}`} label="Skill Description" value={ps.skillDescEn} onChange={(e) => changeHandler(e, i, "skillDescEn")} />
              <Textarea forId={`passive-skillDeskripsi-${index++}`} label="Skill Deskripsi" value={ps.skillDescId} onChange={(e) => changeHandler(e, i, "skillDescId")} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
