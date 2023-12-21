import { SECTION_STYLE, SECTION_TITLE_STYLE, TEXTAREA_STYLE, useData } from "./formbody";

export default function CharIntro() {
  const { data, setData } = useData();
  return (
    <div id="character-intro" className={SECTION_STYLE}>
      <h3 className={SECTION_TITLE_STYLE}>Character Intro</h3>
      <label htmlFor="gacha-intro-en">
        {" "}
        Gacha Intro EN :
        <textarea
          className={TEXTAREA_STYLE}
          value={data?.charIntro?.gachaIntroEn}
          onChange={(e) => setData({ ...data, charIntro: { ...data.charIntro, gachaIntroEn: e.target.value } })}
          placeholder="Gacha Intro EN..."
          defaultValue=""
          name="gachaIntroEn"
          id="gacha-intro-en"
        />
      </label>
      <label htmlFor="gacha-intro-id">
        {" "}
        Gacha Intro ID :
        <textarea
          className={TEXTAREA_STYLE}
          value={data?.charIntro?.gachaIntroId}
          onChange={(e) => setData({ ...data, charIntro: { ...data.charIntro, gachaIntroId: e.target.value } })}
          placeholder="Gacha Intro ID..."
          defaultValue=""
          name="gachaIntroId"
          id="gacha-intro-id"
        />
      </label>
      <label htmlFor="gacha-text-en">
        {" "}
        Gacha Text EN:
        <textarea
          className={TEXTAREA_STYLE}
          value={data?.charIntro?.gachaTextEn}
          onChange={(e) => setData({ ...data, charIntro: { ...data.charIntro, gachaTextEn: e.target.value } })}
          placeholder="Gacha Text EN..."
          defaultValue=""
          name="gachaTextEn"
          id="gacha-text-en"
        />
      </label>

      <label htmlFor="gacha-text-id">
        {" "}
        Gacha Text ID:
        <textarea
          className={TEXTAREA_STYLE}
          value={data?.charIntro?.gachaTextId}
          onChange={(e) => setData({ ...data, charIntro: { ...data.charIntro, gachaTextId: e.target.value } })}
          placeholder="Gacha Text ID..."
          defaultValue=""
          name="gachaTextId"
          id="gacha-text-id"
        />
      </label>

      <label htmlFor="login-text-en">
        {" "}
        Login Text EN:
        <textarea
          className={TEXTAREA_STYLE}
          value={data?.charIntro?.loginTextEn}
          onChange={(e) => setData({ ...data, charIntro: { ...data.charIntro, loginTextEn: e.target.value } })}
          placeholder="Login Text EN..."
          defaultValue=""
          name="loginTextEn"
          id="login-text-en"
        />
      </label>

      <label htmlFor="login-text-id">
        {" "}
        Login Text ID:
        <textarea
          className={TEXTAREA_STYLE}
          value={data?.charIntro?.login}
          onChange={(e) => setData({ ...data, charIntro: { ...data.charIntro, login: e.target.value } })}
          placeholder="Login Text ID..."
          defaultValue=""
          name="loginTextId"
          id="login-text-id"
        />
      </label>

      <label htmlFor="text1-en">
        {" "}
        Text 1 EN:
        <textarea
          className={TEXTAREA_STYLE}
          value={data?.charIntro?.text1En}
          onChange={(e) => setData({ ...data, charIntro: { ...data.charIntro, text1En: e.target.value } })}
          placeholder="Text 1 EN..."
          defaultValue=""
          name="text1En"
          id="text1-en"
        />
      </label>

      <label htmlFor="text1-id">
        {" "}
        Text 1 ID:
        <textarea
          className={TEXTAREA_STYLE}
          value={data?.charIntro?.text1Id}
          onChange={(e) => setData({ ...data, charIntro: { ...data.charIntro, text1Id: e.target.value } })}
          placeholder="Text 1 ID..."
          defaultValue=""
          name="text1Id"
          id="text1-id"
        />
      </label>

      <label htmlFor="text2-en">
        {" "}
        Text 2 EN:
        <textarea
          className={TEXTAREA_STYLE}
          value={data?.charIntro?.text2En}
          onChange={(e) => setData({ ...data, charIntro: { ...data.charIntro, text2En: e.target.value } })}
          placeholder="Text 2 EN..."
          defaultValue=""
          name="text2En"
          id="text2-en"
        />
      </label>

      <label htmlFor="text2-id">
        {" "}
        Text 2 ID:
        <textarea
          className={TEXTAREA_STYLE}
          value={data?.charIntro?.text2Id}
          onChange={(e) => setData({ ...data, charIntro: { ...data.charIntro, text2Id: e.target.value } })}
          placeholder="Text 2 ID..."
          defaultValue=""
          name="text2Id"
          id="text2-id"
        />
      </label>

      <label htmlFor="text3-en">
        {" "}
        Text 3 EN:
        <textarea
          className={TEXTAREA_STYLE}
          value={data?.charIntro?.text3En}
          onChange={(e) => setData({ ...data, charIntro: { ...data.charIntro, text3En: e.target.value } })}
          placeholder="Text 3 EN..."
          defaultValue=""
          name="text3En"
          id="text3-en"
        />
      </label>

      <label htmlFor="text3-id">
        {" "}
        Text 3 ID:
        <textarea
          className={TEXTAREA_STYLE}
          value={data?.charIntro?.text3Id}
          onChange={(e) => setData({ ...data, charIntro: { ...data.charIntro, text3Id: e.target.value } })}
          placeholder="Text 3 ID..."
          defaultValue=""
          name="text3Id"
          id="text3-id"
        />
      </label>

      <label htmlFor="text4-en">
        {" "}
        Text 4 EN:
        <textarea
          className={TEXTAREA_STYLE}
          value={data?.charIntro?.text4En}
          onChange={(e) => setData({ ...data, charIntro: { ...data.charIntro, text4En: e.target.value } })}
          placeholder="Text 4 EN..."
          defaultValue=""
          name="text4En"
          id="text4-en"
        />
      </label>

      <label htmlFor="text4-id">
        {" "}
        Text 4 ID:
        <textarea
          className={TEXTAREA_STYLE}
          value={data?.charIntro?.text4Id}
          onChange={(e) => setData({ ...data, charIntro: { ...data.charIntro, text4Id: e.target.value } })}
          placeholder="Text 4 ID..."
          defaultValue=""
          name="text4Id"
          id="text4-id"
        />
      </label>
    </div>
  );
}
