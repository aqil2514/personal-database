import { P_STYLE1, SECTION_TITLE_STYLE } from "@/components/Layouting/Styles";

export default function CharIntro({ charIntro }: { charIntro: Evertale.Character.Intro }) {
  return (
    <div>
      <h2 className={SECTION_TITLE_STYLE}>Character Intro</h2>
      {charIntro.gachaIntroEn && (
        <>
          <p className={P_STYLE1}>
            <strong>Gacha Intro EN : </strong>
            {charIntro.gachaIntroEn}
          </p>
          <p className={P_STYLE1}>
            <strong>Gacha Intro ID : </strong>
            {charIntro.gachaIntroId}
          </p>
        </>
      )}
      {charIntro.gachaTextEn && (
        <>
          <p className={P_STYLE1}>
            <strong>Gacha Text EN : </strong>
            {charIntro.gachaTextEn}
          </p>
          <p className={P_STYLE1}>
            <strong>Gacha Text ID : </strong>
            {charIntro.gachaTextId}
          </p>
        </>
      )}
      {charIntro.loginTextEn && (
        <>
          <p className={P_STYLE1}>
            <strong>Login Text EN : </strong>
            {charIntro.loginTextEn}
          </p>
          <p className={P_STYLE1}>
            <strong>Login Text ID : </strong>
            {charIntro.loginTextId}
          </p>
        </>
      )}
      {charIntro.text1En && (
        <>
          <p className={P_STYLE1}>
            <strong>Text 1 EN : </strong>
            {charIntro.text1En}
          </p>
          <p className={P_STYLE1}>
            <strong>Text 1 ID : </strong>
            {charIntro.text1Id}
          </p>
        </>
      )}
      {charIntro.text2En && (
        <>
          <p className={P_STYLE1}>
            <strong>Text 2 EN : </strong>
            {charIntro.text2En}
          </p>
          <p className={P_STYLE1}>
            <strong>Text 2 ID : </strong>
            {charIntro.text2Id}
          </p>
        </>
      )}
      {charIntro.text3En && (
        <>
          <p className={P_STYLE1}>
            <strong>Text 3 EN : </strong>
            {charIntro.text3En}
          </p>
          <p className={P_STYLE1}>
            <strong>Text 3 ID : </strong>
            {charIntro.text3Id}
          </p>
        </>
      )}
      {charIntro.text4En && (
        <>
          <p className={P_STYLE1}>
            <strong>Text 4 EN : </strong>
            {charIntro.text4En}
          </p>
          <p className={P_STYLE1}>
            <strong>Text 4 ID : </strong>
            {charIntro.text4Id}
          </p>
        </>
      )}
    </div>
  );
}
