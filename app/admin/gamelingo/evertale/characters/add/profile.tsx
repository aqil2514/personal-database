import { useData } from "./formbody";
import { SECTION_STYLE, SECTION_TITLE_STYLE, TEXTAREA_STYLE } from "@/app/components/Styles";

export default function CharProfile() {
  const { data, setData } = useData();
  return (
    <div id="character-profil" className={SECTION_STYLE}>
      <h3 className={SECTION_TITLE_STYLE}>Character Profile</h3>
      <label htmlFor="part-1-en">
        {" "}
        English part 1 :{" "}
        <textarea
          value={data?.charProfile?.part1En}
          onChange={(e) => setData({ ...data, charProfile: { ...data.charProfile, part1En: e.target.value } })}
          className={TEXTAREA_STYLE}
          placeholder="English Part 1..."
          defaultValue=""
          name="part-1-en"
          required
          id="part-1-en"
        />
      </label>
      <label htmlFor="part-1-id">
        {" "}
        Indonesia part 1 :{" "}
        <textarea
          value={data?.charProfile?.part1Id}
          onChange={(e) => setData({ ...data, charProfile: { ...data.charProfile, part1Id: e.target.value } })}
          className={TEXTAREA_STYLE}
          placeholder="Indonesia Part 1..."
          defaultValue=""
          name="part-1-id"
          required
          id="part-1-id"
        />
      </label>
      <label htmlFor="part-2-en">
        {" "}
        English part 2 :{" "}
        <textarea
          value={data?.charProfile?.part2En}
          onChange={(e) => setData({ ...data, charProfile: { ...data.charProfile, part2En: e.target.value } })}
          className={TEXTAREA_STYLE}
          placeholder="English Part 2..."
          defaultValue=""
          name="part-2-en"
          required
          id="part-2-en"
        />
      </label>
      <label htmlFor="part-2-id">
        {" "}
        Indonesia part 2 :{" "}
        <textarea
          value={data?.charProfile?.part2Id}
          onChange={(e) => setData({ ...data, charProfile: { ...data.charProfile, part2Id: e.target.value } })}
          className={TEXTAREA_STYLE}
          placeholder="Indonesia Part 2..."
          defaultValue=""
          name="part-2-id"
          required
          id="part-2-id"
        />
      </label>
      <label htmlFor="part-3-en">
        {" "}
        English part 3 :{" "}
        <textarea
          value={data?.charProfile?.part3En}
          onChange={(e) => setData({ ...data, charProfile: { ...data.charProfile, part3En: e.target.value } })}
          className={TEXTAREA_STYLE}
          placeholder="English Part 3..."
          defaultValue=""
          name="part-3-en"
          required
          id="part-3-en"
        />
      </label>
      <label htmlFor="part-3-id">
        {" "}
        Indonesia part 3 :{" "}
        <textarea
          value={data?.charProfile?.part3Id}
          onChange={(e) => setData({ ...data, charProfile: { ...data.charProfile, part3Id: e.target.value } })}
          className={TEXTAREA_STYLE}
          placeholder="Indonesia Part 3..."
          defaultValue=""
          name="part-3-id"
          required
          id="part-3-id"
        />
      </label>
    </div>
  );
}
