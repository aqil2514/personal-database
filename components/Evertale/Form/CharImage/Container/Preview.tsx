import { CldImage } from "next-cloudinary";
import { SetStateAction } from "react";

export default function Preview({ isSelected, setIsSelected }: { isSelected: string; setIsSelected: React.Dispatch<SetStateAction<string>> }) {
  return (
    <div className="flex flex-col content-between justify-start gap-2 w-1/3 rounded-md bg-slate-50 p-4">
      {isSelected ? <p className="font-bold font-playfair text-xl text-yellow-600">{isSelected}</p> : <p className="font-bold font-playfair text-xl text-yellow-600">Nothing Selected</p>}
      {isSelected ? (
        <figure className="relative w-full min-h-[350px] max-h-[400px]">
          <CldImage src={`evertale/characters/webp/${isSelected}.webp`} alt={isSelected} fill sizes="auto" className="rounded-xl object-contain" />
        </figure>
      ) : (
        <div className="flex rounded-xl h-[350px] border-4 border-dashed border-black content-center justify-center">
          <p className="font-bold font-playfair text-xl text-black">No Preview</p>
        </div>
      )}
    </div>
  );
}
