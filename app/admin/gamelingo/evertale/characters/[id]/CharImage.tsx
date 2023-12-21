import { FIGURE_STYLE, IMAGE_STYILE } from "./page";

export default function CharImage({ charImage, charName }: { charImage: React.ComponentState; charName: React.ComponentState }) {
  return (
    <div id="charImage">
      <h1 className="text-center font-merriweather font-bold">{charName}</h1>
      <figure className={FIGURE_STYLE}>
        <img className={IMAGE_STYILE} width={720} height={720} src={charImage.f1Img} alt={charName} />
        <figcaption>{charName + " Form 1"}</figcaption>
      </figure>
      {charImage.f2Img && (
        <figure className={FIGURE_STYLE}>
          <img className={IMAGE_STYILE} width={720} height={720} src={charImage.f2Img} alt={charName} />
          <figcaption>{charName + " Form 2"}</figcaption>
        </figure>
      )}
      {charImage.f3Img && (
        <figure className={FIGURE_STYLE}>
          <img className={IMAGE_STYILE} width={720} height={720} src={charImage.f3Img} alt={charName} />
          <figcaption>{charName + " Form 3"}</figcaption>
        </figure>
      )}
    </div>
  );
}
