import { CldImage } from "next-cloudinary";
import { SetStateAction } from "react";

export default function Preview({ isSelected, setIsSelected, game, category }: { isSelected: string[]; setIsSelected: React.Dispatch<SetStateAction<string[]>>; game: string; category: string }) {
  return (
    <div className="flex flex-col content-between justify-start gap-2 w-1/3 rounded-md bg-slate-50 p-4">
      {isSelected.length !== 0 ? <p className="font-bold line-clamp-1 font-playfair text-xl text-yellow-600">{isSelected.join(", ")}</p> : <p className="font-bold font-playfair text-xl text-yellow-600">Nothing Selected</p>}
      {isSelected.length !== 0 ? (
        <figure className="relative w-full min-h-[300px] max-h-[350px]">
          {game === "Evertale" && category === "characters" && <CldImage src={`${game}/${category}/webp/${isSelected.slice(-1)}.webp`} alt={isSelected.slice(-1).toString()} fill sizes="auto" className="rounded-xl object-contain" />}
          {game === "Evertale" && category === "weapons" && (
            <CldImage src={`${game.toLowerCase()}/${category}/${isSelected.slice(-1).toString().split(".")[1]}/${isSelected.slice(-1)}`} alt={isSelected.slice(-1).toString()} fill sizes="auto" className="rounded-xl object-contain" />
          )}
        </figure>
      ) : (
        <div className="flex rounded-xl h-[350px] border-4 border-dashed border-black flex-wrap content-center justify-center">
          <p className="font-bold font-playfair text-xl text-black">No Preview</p>
        </div>
      )}
    </div>
  );
}
