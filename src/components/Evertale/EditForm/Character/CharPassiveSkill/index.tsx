import { SectionWrapper, TitleSection } from "@/components/General/Wrapper";
import Setting from "./Setting";
import Verifying from "./Verifying";
import { useCharacter } from "..";
import React from "react";

export default function CharPassiveSkill() {
  const init = useCharacter();
  const [char, setChar] = React.useState<Evertale.Character.State>(init);
  return (
    <SectionWrapper>
      <details className="my-4">
        <summary>Character Passive Skill</summary>
        <TitleSection>Character Passive Skill</TitleSection>
        <Setting char={char} setChar={setChar} />
        <Verifying char={char} />
      </details>
    </SectionWrapper>
  );
}
