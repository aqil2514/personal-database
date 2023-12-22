import { activeSkillsType } from "../../../component/data";
import { ADD_BUTTON_STYLE, INPUT_STYLE, SECTION_STYLE, SECTION_TITLE_STYLE, TEXTAREA_STYLE, useCharacter } from "./form";

export default function ActiveSkill() {
  const { character, setCharacter } = useCharacter();

  return (
    <div id="character-images" className={SECTION_STYLE}>
      <h3 className={SECTION_TITLE_STYLE}>Character Active Skills</h3>
      {character?.charActiveSkill?.map((nas: any, i: number) => (
        <div key={`active-skill-${i + 1}`}>
          <p>
            <strong>Active Skill {i + 1}</strong>
          </p>
          <label htmlFor={`active-skill-name-${i + 1}`}>
            Skill Name :{" "}
            <input
              className={INPUT_STYLE}
              value={nas?.skillName}
              onChange={(e) => {
                setCharacter({
                  ...character,
                  charActiveSkill: [
                    ...character.charActiveSkill.slice(0, i),
                    {
                      ...character.charActiveSkill[i],
                      skillName: e.target.value,
                    },
                    ...character.charActiveSkill.slice(i + 1),
                  ],
                });
              }}
              type="text"
              name="charName"
              id={`active-skill-name-${i + 1}`}
              required
            />
          </label>
          <label htmlFor={`active-skill-spirit-${i + 1}`}>
            Skill Spirit :{" "}
            <input
              className={INPUT_STYLE}
              value={nas?.skillSpirit}
              onChange={(e) => {
                setCharacter({
                  ...character,
                  charActiveSkill: [
                    ...character.charActiveSkill.slice(0, i),
                    {
                      ...character.charActiveSkill[i],
                      skillSpirit: e.target.value,
                    },
                    ...character.charActiveSkill.slice(i + 1),
                  ],
                });
              }}
              type="text"
              name="charName"
              id={`active-skill-name-${i + 1}`}
              required
            />
          </label>
          <div id="skill-type">
            <h3>Skill Type</h3>
            <div id="active-skill-type-container" className="flex flex-nowrap flex-row justify-evenly">
              {activeSkillsType.map((type: string, index: number) => (
                <label htmlFor={type + i + 1} key={`active-skill-${i}-type-${index++}`}>
                  <input className="mx-2" type="checkbox" checked={nas?.typeSkill.find((q: string) => q === type)} data-active-skill={i + 1} name={`active-skill-${i}-type-${index++}`} id={type + i + 1} value={type} />
                  {type}
                </label>
              ))}
            </div>
            <button
              className={ADD_BUTTON_STYLE + " block"}
              type="button"
              onClick={() => {
                const els = document.querySelectorAll(`#active-skill-type-container label input[data-active-skill="${i + 1}"]`);
                const value: string[] = [];
                els.forEach((el: any) => {
                  if (el.checked) {
                    value.push(el.value);
                  }
                });
                setCharacter({
                  ...character,
                  charActiveSkill: [
                    ...character.charActiveSkill.slice(0, i),
                    {
                      ...character.charActiveSkill[i],
                      typeSkill: value,
                    },
                    ...character.charActiveSkill.slice(i + 1),
                  ],
                });
              }}
            >
              Fiksasi
            </button>
          </div>
          <label htmlFor={`active-skill-target-${i + 1}`}>
            Skill Target :{" "}
            <input
              className={INPUT_STYLE}
              value={nas?.skillTarget}
              onChange={(e) => {
                setCharacter({
                  ...character,
                  charActiveSkill: [
                    ...character.charActiveSkill.slice(0, i),
                    {
                      ...character.charActiveSkill[i],
                      skillTarget: e.target.value,
                    },
                    ...character.charActiveSkill.slice(i + 1),
                  ],
                });
              }}
              type="text"
              name="charName"
              id={`active-skill-name-${i + 1}`}
              required
            />
          </label>
          <label htmlFor={`active-skill-TU-${i + 1}`}>
            Skill TU :{" "}
            <input
              className={INPUT_STYLE}
              value={nas?.skillTu}
              onChange={(e) => {
                setCharacter({
                  ...character,
                  charActiveSkill: [
                    ...character.charActiveSkill.slice(0, i),
                    {
                      ...character.charActiveSkill[i],
                      skillTu: e.target.value,
                    },
                    ...character.charActiveSkill.slice(i + 1),
                  ],
                });
              }}
              type="text"
              name="charName"
              id={`active-skill-name-${i + 1}`}
              required
            />
          </label>
          <label htmlFor="passive-desc-en">
            Description :
            <textarea
              className={TEXTAREA_STYLE}
              value={nas?.skillDescEn}
              onChange={(e) => {
                setCharacter({
                  ...character,
                  charActiveSkill: [
                    ...character.charActiveSkill.slice(0, i),
                    {
                      ...character.charActiveSkill[i],
                      skillDescEn: e.target.value,
                    },
                    ...character.charActiveSkill.slice(i + 1),
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
              value={nas?.skillDescId}
              onChange={(e) => {
                setCharacter({
                  ...character,
                  charActiveSkill: [
                    ...character.charActiveSkill.slice(0, i),
                    {
                      ...character.charActiveSkill[i],
                      skillDescId: e.target.value,
                    },
                    ...character.charActiveSkill.slice(i + 1),
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
