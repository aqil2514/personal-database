import { SECTION_STYLE, SECTION_TITLE_STYLE, INPUT_STYLE, useData } from "./formbody";
export default function CharImages() {
  const { data, setData } = useData();
  return (
    <div id="character-images" className={SECTION_STYLE}>
      <h3 className={SECTION_TITLE_STYLE}>Character Images</h3>
      <label htmlFor="f1Img">
        Form 1 Image : <input className={INPUT_STYLE} value={data?.charImage?.f1Img} onChange={(e) => setData({ ...data, charImage: { ...data.charImage, f1Img: e.target.value } })} type="text" name="f1Img" id="f1Img" required />
      </label>
      <label htmlFor="f2Img">
        Form 2 Image : <input className={INPUT_STYLE} value={data?.charImage?.f2Img} onChange={(e) => setData({ ...data, charImage: { ...data.charImage, f2Img: e.target.value } })} type="text" name="f2Img" id="f2Img" />
      </label>
      <label htmlFor="f3Img">
        Form 3 Image : <input className={INPUT_STYLE} value={data?.charImage?.f3Img} onChange={(e) => setData({ ...data, charImage: { ...data.charImage, f3Img: e.target.value } })} type="text" name="f3Img" id="f3Img" />
      </label>
    </div>
  );
}
