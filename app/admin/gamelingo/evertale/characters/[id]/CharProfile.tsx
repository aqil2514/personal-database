import { P_STYLE1, SECTION_TITLE_STYLE } from "./page";

export default function CharProfile({ charProfile }: { charProfile: React.ComponentState }) {
  return (
    <div id="charProfile">
      <div id="part1">
        <h1 className={SECTION_TITLE_STYLE}>Part 1 En</h1>
        <p className={P_STYLE1}>{charProfile.part1En}</p>
        <hr />
        <h1 className={SECTION_TITLE_STYLE}>Part 1 Id</h1>
        <p className={P_STYLE1}>{charProfile.part1Id}</p>
      </div>
      <div id="part2">
        <h2 className={SECTION_TITLE_STYLE}>Part 2 En</h2>
        <p className={P_STYLE1}>{charProfile.part2En}</p>
        <hr />
        <h2 className={SECTION_TITLE_STYLE}>Part 2 Id</h2>
        <p className={P_STYLE1}>{charProfile.part2Id}</p>
      </div>
      <div id="part3">
        <h3 className={SECTION_TITLE_STYLE}>Part 3 En</h3>
        <p className={P_STYLE1}>{charProfile.part3En}</p>
        <hr />
        <h3 className={SECTION_TITLE_STYLE}>Part 3 Id</h3>
        <p className={P_STYLE1}>{charProfile.part3Id}</p>
      </div>
    </div>
  );
}
