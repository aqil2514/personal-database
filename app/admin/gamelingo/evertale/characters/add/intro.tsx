import { SECTION_STYLE, SECTION_TITLE_STYLE, TEXTAREA_STYLE } from "./formbody";

export default function CharIntro() {
  return (
    <div id="character-intro" className={SECTION_STYLE}>
      <h3 className={SECTION_TITLE_STYLE}>Character Intro</h3>
      <label htmlFor="gacha-intro-en">
        {" "}
        Gacha Intro EN :
        <textarea className={TEXTAREA_STYLE} placeholder="Gacha Intro EN..." defaultValue="" name="gachaIntroEn" id="gacha-intro-en" />
      </label>
      <label htmlFor="gacha-intro-id">
        {" "}
        Gacha Intro ID :
        <textarea className={TEXTAREA_STYLE} placeholder="Gacha Intro ID..." defaultValue="" name="gachaIntroId" id="gacha-intro-id" />
      </label>
      <label htmlFor="gacha-text-en">
        {" "}
        Gacha Text EN:
        <textarea className={TEXTAREA_STYLE} placeholder="Gacha Text EN..." defaultValue="" name="gachaTextEn" id="gacha-text-en" />
      </label>

      <label htmlFor="gacha-text-id">
        {" "}
        Gacha Text ID:
        <textarea className={TEXTAREA_STYLE} placeholder="Gacha Text ID..." defaultValue="" name="gachaTextId" id="gacha-text-id" />
      </label>

      <label htmlFor="login-text-en">
        {" "}
        Login Text EN:
        <textarea className={TEXTAREA_STYLE} placeholder="Login Text EN..." defaultValue="" name="loginTextEn" id="login-text-en" />
      </label>

      <label htmlFor="login-text-id">
        {" "}
        Login Text ID:
        <textarea className={TEXTAREA_STYLE} placeholder="Login Text ID..." defaultValue="" name="loginTextId" id="login-text-id" />
      </label>

      <label htmlFor="text1-en">
        {" "}
        Text 1 EN:
        <textarea className={TEXTAREA_STYLE} placeholder="Text 1 EN..." defaultValue="" name="text1En" id="text1-en" />
      </label>

      <label htmlFor="text1-id">
        {" "}
        Text 1 ID:
        <textarea className={TEXTAREA_STYLE} placeholder="Text 1 ID..." defaultValue="" name="text1Id" id="text1-id" />
      </label>

      <label htmlFor="text2-en">
        {" "}
        Text 2 EN:
        <textarea className={TEXTAREA_STYLE} placeholder="Text 2 EN..." defaultValue="" name="text2En" id="text2-en" />
      </label>

      <label htmlFor="text2-id">
        {" "}
        Text 2 ID:
        <textarea className={TEXTAREA_STYLE} placeholder="Text 2 ID..." defaultValue="" name="text2Id" id="text2-id" />
      </label>

      <label htmlFor="text3-en">
        {" "}
        Text 3 EN:
        <textarea className={TEXTAREA_STYLE} placeholder="Text 3 EN..." defaultValue="" name="text3En" id="text3-en" />
      </label>

      <label htmlFor="text3-id">
        {" "}
        Text 3 ID:
        <textarea className={TEXTAREA_STYLE} placeholder="Text 3 ID..." defaultValue="" name="text3Id" id="text3-id" />
      </label>

      <label htmlFor="text4-en">
        {" "}
        Text 4 EN:
        <textarea className={TEXTAREA_STYLE} placeholder="Text 4 EN..." defaultValue="" name="text4En" id="text4-en" />
      </label>

      <label htmlFor="text4-id">
        {" "}
        Text 4 ID:
        <textarea className={TEXTAREA_STYLE} placeholder="Text 4 ID..." defaultValue="" name="text4Id" id="text4-id" />
      </label>
    </div>
  );
}
