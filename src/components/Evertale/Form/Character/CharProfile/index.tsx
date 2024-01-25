import { SectionWrapper, TitleSection } from "@/components/General/Wrapper";
import { Textarea } from "@/components/General/Textarea";
import { translateHandler } from "@/components/Utils";
import { useCharacterData } from "@/components/Evertale/Providers";

export default function CharProfile() {
  const { data, setData } = useCharacterData();

  function changeHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const field = e.target.getAttribute("data-field") as string;
    setData({ ...data, charProfile: { ...data.charProfile, [field]: e.target.value } });
    console.log(field);
  }
  return (
    <SectionWrapper>
      <TitleSection>Character Profile</TitleSection>

      <Textarea forId="part-1-en" label="Part 1 EN" data-field="part1En" value={data?.charProfile?.part1En} onChange={changeHandler} onKeyDown={(e) => translateHandler(e, "charProfile", data, setData)} />

      <Textarea forId="part-1-id" label="Part 1 ID" data-field="part1Id" value={data?.charProfile?.part1Id} onChange={changeHandler} />

      <Textarea forId="part-2-en" label="Part 2 EN" data-field="part2En" value={data?.charProfile?.part2En} onChange={changeHandler} onKeyDown={(e) => translateHandler(e, "charProfile", data, setData)} />

      <Textarea forId="part-2-id" label="Part 2 ID" data-field="part2Id" value={data?.charProfile?.part2Id} onChange={changeHandler} />

      <Textarea forId="part-3-en" label="Part 3 EN" data-field="part3En" value={data?.charProfile?.part3En} onChange={changeHandler} onKeyDown={(e) => translateHandler(e, "charProfile", data, setData)} />

      <Textarea forId="part-3-id" label="Part 3 ID" data-field="part3Id" value={data?.charProfile?.part3Id} onChange={changeHandler} />
    </SectionWrapper>
  );
}
