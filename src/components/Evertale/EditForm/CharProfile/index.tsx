import { SectionWrapper, TitleSection } from "@/components/General/Wrapper";
import { Textarea } from "@/components/General/Textarea";
import { useCharacter } from "..";
import React from "react";
import Verifying from "./Verifying";

export default function CharProfile() {
  const init = useCharacter();
  const [char, setChar] = React.useState<Evertale.Character.State>(init);
  const charProfile: Evertale.Character.Profile = char.charProfile;

  function changeHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const field = e.target.getAttribute("data-field") as string;
    setChar({ ...char, charProfile: { ...char.charProfile, [field]: e.target.value } });
  }
  return (
    <SectionWrapper>
      <details className="my-4">
        <summary>Character Profile</summary>
        <TitleSection>Character Profile</TitleSection>

        <Textarea forId="part-1-en" label="Part 1 EN" data-field="part1En" value={charProfile.part1En} onChange={changeHandler} />

        <Textarea forId="part-1-id" label="Part 1 ID" data-field="part1Id" value={charProfile.part1Id} onChange={changeHandler} />

        <Textarea forId="part-2-en" label="Part 2 EN" data-field="part2En" value={charProfile.part2En} onChange={changeHandler} />

        <Textarea forId="part-2-id" label="Part 2 ID" data-field="part2Id" value={charProfile.part2Id} onChange={changeHandler} />

        <Textarea forId="part-3-en" label="Part 3 EN" data-field="part3En" value={charProfile.part3En} onChange={changeHandler} />

        <Textarea forId="part-3-id" label="Part 3 ID" data-field="part3Id" value={charProfile.part3Id} onChange={changeHandler} />

        <Verifying char={char} />
      </details>
    </SectionWrapper>
  );
}
