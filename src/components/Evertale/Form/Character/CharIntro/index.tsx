import { SectionWrapper, TitleSection } from "@/components/General/Wrapper";
import { Textarea } from "@/components/General/Textarea";
import axios from "axios";
import { translateHandler } from "@/components/Utils";
import { useCharacterData } from "@/components/Evertale/Providers";

export default function CharIntro() {
  const { data, setData } = useCharacterData();

  function changeHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const field = e.target.getAttribute("data-field");
    setData({ ...data, charIntro: { ...data.charIntro, [field as string]: e.target.value } });
  }

  return (
    <SectionWrapper>
      <TitleSection>Character Intro</TitleSection>

      <Textarea forId="gacha-intro-en" label="Gacha Intro EN" data-field="gachaIntroEn" value={data?.charIntro?.gachaIntroEn} onChange={changeHandler} onKeyDown={(e) => translateHandler(e, "charIntro", data, setData)} />

      <Textarea forId="gacha-intro-id" label="Gacha Intro ID" data-field="gachaIntroId" value={data?.charIntro?.gachaIntroId} onChange={changeHandler} />

      <Textarea forId="gacha-text-en" label="Gacha Text EN" data-field="gachaTextEn" value={data?.charIntro?.gachaTextEn} onChange={changeHandler} onKeyDown={(e) => translateHandler(e, "charIntro", data, setData)} />

      <Textarea forId="gacha-text-id" label="Gacha Text ID" data-field="gachaTextId" value={data?.charIntro?.gachaTextId} onChange={changeHandler} />

      <Textarea forId="login-text-en" label="Login Text EN" data-field="loginTextEn" value={data?.charIntro?.loginTextEn} onChange={changeHandler} onKeyDown={(e) => translateHandler(e, "charIntro", data, setData)} />

      <Textarea forId="login-text-id" label="Login Text ID" data-field="loginTextId" value={data?.charIntro?.loginTextId} onChange={changeHandler} />

      <Textarea forId="text-1-en" label="Text 1 EN" data-field="text1En" value={data?.charIntro?.text1En} onChange={changeHandler} onKeyDown={(e) => translateHandler(e, "charIntro", data, setData)} />

      <Textarea forId="text-1-id" label="Text 1 ID" data-field="text1Id" value={data?.charIntro?.text1Id} onChange={changeHandler} />

      <Textarea forId="text-2-en" label="Text 2 EN" data-field="text2En" value={data?.charIntro?.text2En} onChange={changeHandler} onKeyDown={(e) => translateHandler(e, "charIntro", data, setData)} />

      <Textarea forId="text-2-id" label="Text 2 ID" data-field="text2Id" value={data?.charIntro?.text2Id} onChange={changeHandler} />

      <Textarea forId="text-3-en" label="Text 3 EN" data-field="text3En" value={data?.charIntro?.text3En} onChange={changeHandler} onKeyDown={(e) => translateHandler(e, "charIntro", data, setData)} />

      <Textarea forId="text-3-id" label="Text 3 ID" data-field="text3Id" value={data?.charIntro?.text3Id} onChange={changeHandler} />

      <Textarea forId="text-4-en" label="Text 4 EN" data-field="text4En" value={data?.charIntro?.text4En} onChange={changeHandler} onKeyDown={(e) => translateHandler(e, "charIntro", data, setData)} />

      <Textarea forId="text-4-id" label="Text 4 ID" data-field="text4Id" value={data?.charIntro?.text4Id} onChange={changeHandler} />
    </SectionWrapper>
  );
}
