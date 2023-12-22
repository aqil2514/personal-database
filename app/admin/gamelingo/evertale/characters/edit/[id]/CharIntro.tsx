import { useState } from "react";
import { SECTION_STYLE, SECTION_TITLE_STYLE, TEXTAREA_STYLE, useCharacter } from "./form";

export default function CharIntro() {
  const { character, setCharacter } = useCharacter();
  const [isCharInfo, setIsCharInfo] = useState<Boolean>(false);

  return (
    <>
      <div id="character-intro" className={SECTION_STYLE}>
        <h3 className={SECTION_TITLE_STYLE}>Character Intro</h3>

        <div>
          <label htmlFor="isthere-char-info">
            Char Info
            <input type="checkbox" checked={isCharInfo === true} name="isthere-char-info" onChange={() => setIsCharInfo(!isCharInfo)} id="isthere-char-info" />
          </label>
        </div>
        {isCharInfo ? (
          <>
            <label htmlFor="gacha-intro-en">
              {" "}
              Gacha Intro EN :
              <textarea
                className={TEXTAREA_STYLE}
                value={character?.charIntro?.gachaIntroEn}
                onChange={(e) => setCharacter({ ...character, charIntro: { ...character.charIntro, gachaIntroEn: e.target.value } })}
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
                value={character?.charIntro?.gachaIntroId}
                onChange={(e) => setCharacter({ ...character, charIntro: { ...character.charIntro, gachaIntroId: e.target.value } })}
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
                value={character?.charIntro?.gachaTextEn}
                onChange={(e) => setCharacter({ ...character, charIntro: { ...character.charIntro, gachaTextEn: e.target.value } })}
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
                value={character?.charIntro?.gachaTextId}
                onChange={(e) => setCharacter({ ...character, charIntro: { ...character.charIntro, gachaTextId: e.target.value } })}
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
                value={character?.charIntro?.loginTextEn}
                onChange={(e) => setCharacter({ ...character, charIntro: { ...character.charIntro, loginTextEn: e.target.value } })}
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
                value={character?.charIntro?.loginTextId}
                onChange={(e) => setCharacter({ ...character, charIntro: { ...character.charIntro, loginTextId: e.target.value } })}
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
                value={character?.charIntro?.text1En}
                onChange={(e) => setCharacter({ ...character, charIntro: { ...character.charIntro, text1En: e.target.value } })}
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
                value={character?.charIntro?.text1Id}
                onChange={(e) => setCharacter({ ...character, charIntro: { ...character.charIntro, text1Id: e.target.value } })}
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
                value={character?.charIntro?.text2En}
                onChange={(e) => setCharacter({ ...character, charIntro: { ...character.charIntro, text2En: e.target.value } })}
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
                value={character?.charIntro?.text2Id}
                onChange={(e) => setCharacter({ ...character, charIntro: { ...character.charIntro, text2Id: e.target.value } })}
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
                value={character?.charIntro?.text3En}
                onChange={(e) => setCharacter({ ...character, charIntro: { ...character.charIntro, text3En: e.target.value } })}
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
                value={character?.charIntro?.text3Id}
                onChange={(e) => setCharacter({ ...character, charIntro: { ...character.charIntro, text3Id: e.target.value } })}
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
                value={character?.charIntro?.text4En}
                onChange={(e) => setCharacter({ ...character, charIntro: { ...character.charIntro, text4En: e.target.value } })}
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
                value={character?.charIntro?.text4Id}
                onChange={(e) => setCharacter({ ...character, charIntro: { ...character.charIntro, text4Id: e.target.value } })}
                placeholder="Text 4 ID..."
                defaultValue=""
                name="text4Id"
                id="text4-id"
              />
            </label>
          </>
        ) : (
          <p>Belum ada data infonya</p>
        )}
      </div>
    </>
  );
}
