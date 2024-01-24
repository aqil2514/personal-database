import Image from "next/image";
import React, { SetStateAction } from "react";

export default function Images({ isSelected, setIsSelected, res }: { isSelected: string[]; setIsSelected: React.Dispatch<SetStateAction<string[]>>; res: any }) {
  if (!res.data || res.isLoading) return <p className="font-bold font-playfair text-xl">Loading...</p>;
  if (res.error) return <p className="font-bold font-playfair text-red-600 text-xl">Failed</p>;

  const images = res.data.data;

  function clickHandler(e: React.MouseEvent<HTMLImageElement>) {
    const target = e.target as HTMLImageElement;
    const alt = target.alt;

    if (isSelected.includes(alt)) {
      const filtered = isSelected.filter((select: string) => select !== alt);
      setIsSelected(filtered);
      return;
    }

    setIsSelected([...isSelected, alt]);
  }

  return (
    <div className="grid grid-cols-4 gap-2 w-2/3 h-full overflow-y-scroll rounded-md bg-slate-50 p-4">
      {images.length === 0 ? (
        <p className="font-bold font-playfair text-xl">No Data</p>
      ) : (
        images.map((img: any, i: number) => (
          <figure key={`image-${i++}`} className="relative w-full h-60 aspect-square rounded-xl cursor-pointer hover:scale-[1.1] transition-all duration-500">
            <Image src={img.url} fill sizes="auto" onClick={clickHandler} alt={img.name} className={`object-cover rounded-xl ${isSelected.includes(img.name) ? `border-4 border-blue-300` : ``}`} />
          </figure>
        ))
      )}
    </div>
  );
}
