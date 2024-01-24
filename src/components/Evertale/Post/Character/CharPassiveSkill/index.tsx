import { P_STYLE1, SECTION_TITLE_STYLE } from "@/components/Layouting/Styles";

export default function CharPassiveSkill({ charPassiveSkill }: { charPassiveSkill: Evertale.Character.PassiveSkill[] }) {
  return (
    <div>
      <h3 className={SECTION_TITLE_STYLE}>Passive Skills</h3>
      {charPassiveSkill.map((cps: React.ComponentState, i: number) => (
        <div className="my-4" key={`cps-${i++}`}>
          <p className={P_STYLE1}>
            <strong>Passive Skill {i + 1}. </strong>
          </p>
          <p className={P_STYLE1}>
            <strong>Skill Name : </strong>
            {cps.skillName}
          </p>
          <p className={P_STYLE1}>
            <strong>Skill Type : </strong>
            {cps.typeSkill.join(", ")}
          </p>
          <article>
            <strong>Skill Description : </strong>
            <p>{cps.skillDescEn}</p>
          </article>
          <article>
            <strong>Deskripsi Skill : </strong>
            <p>{cps.skillDescId}</p>
          </article>
        </div>
      ))}
    </div>
  );
}
