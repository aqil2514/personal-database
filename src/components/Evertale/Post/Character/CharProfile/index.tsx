import { P_STYLE1, SECTION_TITLE_STYLE } from "@/components/Layouting/Styles";

export default function CharProfile({ charProfile }: { charProfile: Evertale.Character.Profile }) {
  return (
    <div id="charProfile">
      <h1 className={SECTION_TITLE_STYLE}>Character Profile</h1>
      <article id="part1">
        <strong>Part 1 En</strong>
        <p className={P_STYLE1}>{charProfile.part1En}</p>
        <hr />
        <strong>Part 1 Id</strong>
        <p className={P_STYLE1}>{charProfile.part1Id}</p>
      </article>
      {charProfile.part2En && charProfile.part2Id && (
        <div id="part2">
          <strong className={SECTION_TITLE_STYLE}>Part 2 En</strong>
          <p className={P_STYLE1}>{charProfile.part2En}</p>
          <hr />
          <strong className={SECTION_TITLE_STYLE}>Part 2 Id</strong>
          <p className={P_STYLE1}>{charProfile.part2Id}</p>
        </div>
      )}
      {charProfile.part3En && charProfile.part3Id && (
        <div id="part3">
          <strong className={SECTION_TITLE_STYLE}>Part 3 En</strong>
          <p className={P_STYLE1}>{charProfile.part3En}</p>
          <hr />
          <strong className={SECTION_TITLE_STYLE}>Part 3 Id</strong>
          <p className={P_STYLE1}>{charProfile.part3Id}</p>
        </div>
      )}
    </div>
  );
}
