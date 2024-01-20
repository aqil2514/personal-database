import { SectionWrapper, TitleSection } from "@/components/General/Wrapper";
import { Textarea } from "@/components/General/Textarea";
import { useCharacter } from "..";
import React from "react";
import Verifying from "./Verifying";

export default function CharIntro() {
  const init = useCharacter();
  const [char, setChar] = React.useState<Evertale.Character.State>(init);
  const charIntro: Evertale.Character.Intro = char.charIntro;

  function changeHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const field = e.target.getAttribute("data-field") as string;
    setChar({ ...char, charIntro: { ...char.charIntro, [field]: e.target.value } });
  }
  return (
    <SectionWrapper>
      <details className="my-4">
        <summary>Character Intro</summary>
        <TitleSection>Character Intro</TitleSection>

        <Textarea forId="gacha-intro-en" label="Gacha Intro EN" data-field="gachaIntroEn" value={charIntro.gachaIntroEn} onChange={changeHandler} />

        <Textarea forId="gacha-intro-id" label="Gacha Intro ID" data-field="gachaIntroId" value={charIntro.gachaIntroId} onChange={changeHandler} />

        <Textarea forId="gacha-text-en" label="Gacha Text EN" data-field="gachaTextEn" value={charIntro.gachaTextEn} onChange={changeHandler} />

        <Textarea forId="gacha-text-id" label="Gacha Text ID" data-field="gachaTextId" value={charIntro.gachaTextId} onChange={changeHandler} />

        <Textarea forId="login-text-en" label="Login Text EN" data-field="loginTextEn" value={charIntro.loginTextEn} onChange={changeHandler} />

        <Textarea forId="login-text-id" label="Login Text ID" data-field="loginTextId" value={charIntro.loginTextId} onChange={changeHandler} />

        <Textarea forId="text-1-en" label="Text 1 EN" data-field="text1En" value={charIntro.text1En} onChange={changeHandler} />

        <Textarea forId="text-1-id" label="Text 1 ID" data-field="text1Id" value={charIntro.text1Id} onChange={changeHandler} />

        <Textarea forId="text-2-en" label="Text 2 EN" data-field="text2En" value={charIntro.text2En} onChange={changeHandler} />

        <Textarea forId="text-2-id" label="Text 2 ID" data-field="text2Id" value={charIntro.text2Id} onChange={changeHandler} />

        <Textarea forId="text-3-en" label="Text 3 EN" data-field="text3En" value={charIntro.text3En} onChange={changeHandler} />

        <Textarea forId="text-3-id" label="Text 3 ID" data-field="text3Id" value={charIntro.text3Id} onChange={changeHandler} />

        <Textarea forId="text-4-en" label="Text 4 EN" data-field="text4En" value={charIntro.text4En} onChange={changeHandler} />

        <Textarea forId="text-4-id" label="Text 4 ID" data-field="text4Id" value={charIntro.text4Id} onChange={changeHandler} />

        <Verifying char={char} />
      </details>
    </SectionWrapper>
  );
}
