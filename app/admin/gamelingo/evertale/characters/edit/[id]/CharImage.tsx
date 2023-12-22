import { INPUT_STYLE, SECTION_STYLE, SECTION_TITLE_STYLE, useCharacter } from "./form";

export default function CharImages() {
  const { character, setCharacter } = useCharacter();

  return (
    <div id="character-images" className={SECTION_STYLE}>
      <h3 className={SECTION_TITLE_STYLE}>Character Images</h3>
      <label htmlFor="f1Img">
        Form 1 Image :{" "}
        <input className={INPUT_STYLE} onChange={(e) => setCharacter({ ...character, charImage: { ...character.charImage, f1Img: e.target.value } })} value={character?.charImage?.f1Img} type="text" name="f1Img" id="f1Img" required />
      </label>
      <label htmlFor="f2Img">
        Form 2 Image : <input className={INPUT_STYLE} onChange={(e) => setCharacter({ ...character, charImage: { ...character.charImage, f2Img: e.target.value } })} value={character?.charImage?.f2Img} type="text" name="f2Img" id="f2Img" />
      </label>
      <label htmlFor="f3Img">
        Form 3 Image : <input className={INPUT_STYLE} onChange={(e) => setCharacter({ ...character, charImage: { ...character.charImage, f3Img: e.target.value } })} value={character?.charImage?.f3Img} type="text" name="f3Img" id="f3Img" />
      </label>
    </div>
  );
}
