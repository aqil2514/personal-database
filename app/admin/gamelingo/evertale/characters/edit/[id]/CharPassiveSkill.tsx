import { passiveSkillsType } from "../../../component/data";
import { ADD_BUTTON_STYLE, INPUT_STYLE, SECTION_STYLE, SECTION_TITLE_STYLE, TEXTAREA_STYLE, useCharacter } from "./form";

export default function PassiveSkill() {
  const { character, setCharacter } = useCharacter();

  return (
    <div id="character-images" className={SECTION_STYLE}>
      <h3 className={SECTION_TITLE_STYLE}>Character Passive Skills</h3>
      {character?.charPassiveSkill?.map((nps: any, i: number) => (
        <div key={`passive-skill-${i + 1}`}>
          <p>
            <strong>Passive Skill {i + 1}</strong>
          </p>
          <label htmlFor={`passive-skill-name-${i + 1}`}>
            Skill Name :{" "}
            <input
              className={INPUT_STYLE}
              value={nps?.skillName}
              onChange={(e) => {
                setCharacter({
                  ...character,
                  charPassiveSkill: [
                    ...character.charPassiveSkill.slice(0, i),
                    {
                      ...character.charPassiveSkill[i],
                      skillName: e.target.value,
                    },
                    ...character.charPassiveSkill.slice(i + 1),
                  ],
                });
              }}
              type="text"
              name="charName"
              id={`passive-skill-name-${i + 1}`}
              required
            />
          </label>
          <div id="skill-type">
            <h3>Skill Type</h3>
            <div id="passive-skill-type-container" className="flex flex-nowrap flex-row justify-evenly">
              {passiveSkillsType.map((type: string, index: number) => (
                <label htmlFor={type + i + 1} key={`passive-skill-${i}-type-${index++}`}>
                  <input className="mx-2" type="checkbox" checked={nps?.typeSkill.find((q: string) => q === type)} data-passive-skill={i + 1} name={`passive-skill-${i}-type-${index++}`} id={type + i + 1} value={type} />
                  {type}
                </label>
              ))}
            </div>
            <button
              className={ADD_BUTTON_STYLE + " block"}
              type="button"
              onClick={() => {
                const els = document.querySelectorAll(`#passive-skill-type-container label input[data-passive-skill="${i + 1}"]`);
                const value: string[] = [];
                els.forEach((el: any) => {
                  if (el.checked) {
                    value.push(el.value);
                  }
                });
                setCharacter({
                  ...character,
                  charPassiveSkill: [
                    ...character.charPassiveSkill.slice(0, i),
                    {
                      ...character.charPassiveSkill[i],
                      typeSkill: value,
                    },
                    ...character.charPassiveSkill.slice(i + 1),
                  ],
                });
              }}
            >
              Fiksasi
            </button>
          </div>
          <label htmlFor="passive-desc-en">
            Description :
            <textarea
              className={TEXTAREA_STYLE}
              value={nps?.skillDescEn}
              onChange={(e) => {
                setCharacter({
                  ...character,
                  charPassiveSkill: [
                    ...character.charPassiveSkill.slice(0, i),
                    {
                      ...character.charPassiveSkill[i],
                      skillDescEn: e.target.value,
                    },
                    ...character.charPassiveSkill.slice(i + 1),
                  ],
                });
              }}
              name="descEn"
              id="passive-desc-en"
            />
          </label>
          <label htmlFor="passive-desc-id">
            Deskripsi :
            <textarea
              className={TEXTAREA_STYLE}
              value={nps?.skillDescId}
              onChange={(e) => {
                setCharacter({
                  ...character,
                  charPassiveSkill: [
                    ...character.charPassiveSkill.slice(0, i),
                    {
                      ...character.charPassiveSkill[i],
                      skillDescId: e.target.value,
                    },
                    ...character.charPassiveSkill.slice(i + 1),
                  ],
                });
              }}
              name="descId"
              id="passive-desc-id"
            />
          </label>
        </div>
      ))}
    </div>
  );
}
