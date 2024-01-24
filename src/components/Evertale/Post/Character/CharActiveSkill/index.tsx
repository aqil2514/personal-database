import { P_STYLE1, SECTION_TITLE_STYLE } from "@/components/Layouting/Styles";

export default function CharActiveSkill({ charActiveSkill }: { charActiveSkill: Evertale.Character.ActiveSkill[] }) {
  return (
    <div id="charActiveSkill">
      <h3 className={SECTION_TITLE_STYLE}>Active Skills</h3>
      {charActiveSkill.map((cas: React.ComponentState, i: number) => (
        <div key={`cas-${i++}`} className="my-4">
          <p className={P_STYLE1}>
            <strong>Active Skill {i + 1} : </strong>
          </p>
          <p className={P_STYLE1}>
            <strong>Skill Name : </strong>
            {cas.skillName}
          </p>
          <p className={P_STYLE1}>
            <strong>Skill Type : </strong>
            {cas.typeSkill.join(", ")}
          </p>
          <p className={P_STYLE1}>
            <strong>Skill Spirit : </strong>
            {cas.skillSpirit}
          </p>
          <p className={P_STYLE1}>
            <strong>Skill Target : </strong>
            {cas.skillTarget}
          </p>
          <p className={P_STYLE1}>
            <strong>Skill TU : </strong>
            {cas.skillTu}
          </p>
          <article>
            <strong>Skill Description : </strong>
            <p>{cas.skillDescEn}</p>
          </article>
          <article>
            <strong>Deskripsi Skill : </strong>
            <p>{cas.skillDescId}</p>
          </article>
        </div>
      ))}
    </div>
  );
}
