import { SECTION_STYLE, SECTION_TITLE_STYLE, TEXTAREA_STYLE, useCharacter } from "./form";

export default function CharProfile() {
    const { character, setCharacter } = useCharacter();
  
    return (
      <div id="character-profil" className={SECTION_STYLE}>
        <h3 className={SECTION_TITLE_STYLE}>Character Profile</h3>
        <label htmlFor="part-1-en">
          {" "}
          English part 1 :{" "}
          <textarea
            className={TEXTAREA_STYLE}
            value={character?.charProfile?.part1En}
            onChange={(e) => setCharacter({ ...character, charProfile: { ...character.charProfile, part1En: e.target.value } })}
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
            className={TEXTAREA_STYLE}
            value={character?.charProfile?.part1Id}
            onChange={(e) => setCharacter({ ...character, charProfile: { ...character.charProfile, part1Id: e.target.value } })}
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
            className={TEXTAREA_STYLE}
            value={character?.charProfile?.part2En}
            onChange={(e) => setCharacter({ ...character, charProfile: { ...character.charProfile, part2En: e.target.value } })}
            placeholder="English Part 2..."
            defaultValue=""
            name="part-2-en"
            id="part-2-en"
          />
        </label>
        <label htmlFor="part-2-id">
          {" "}
          Indonesia part 2 :{" "}
          <textarea
            className={TEXTAREA_STYLE}
            value={character?.charProfile?.part2Id}
            onChange={(e) => setCharacter({ ...character, charProfile: { ...character.charProfile, part2Id: e.target.value } })}
            placeholder="Indonesia Part 2..."
            defaultValue=""
            name="part-2-id"
            id="part-2-id"
          />
        </label>
        <label htmlFor="part-3-en">
          {" "}
          English part 3 :{" "}
          <textarea
            className={TEXTAREA_STYLE}
            value={character?.charProfile?.part3En}
            onChange={(e) => setCharacter({ ...character, charProfile: { ...character.charProfile, part3En: e.target.value } })}
            placeholder="English Part 3..."
            defaultValue=""
            name="part-3-en"
            id="part-3-en"
          />
        </label>
        <label htmlFor="part-3-id">
          {" "}
          Indonesia part 3 :{" "}
          <textarea
            className={TEXTAREA_STYLE}
            value={character?.charProfile?.part3Id}
            onChange={(e) => setCharacter({ ...character, charProfile: { ...character.charProfile, part3Id: e.target.value } })}
            placeholder="Indonesia Part 3..."
            defaultValue=""
            name="part-3-id"
            id="part-3-id"
          />
        </label>
      </div>
    );
  }