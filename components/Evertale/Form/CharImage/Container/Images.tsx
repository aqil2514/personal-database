import Image from "next/image";
import React, { SetStateAction } from "react";
import useSWRImmutable from "swr/immutable";

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export default function Images({ isSelected, setIsSelected }: { isSelected: string; setIsSelected: React.Dispatch<SetStateAction<string>> }) {
  const URL = "/api/file?game=evertale&category=characters&format=webp";
  const res = useSWRImmutable(URL, fetcher);

  if (!res.data || res.isLoading) return <p className="font-bold font-playfair text-xl">Loading...</p>;
  if (res.error) return <p className="font-bold font-playfair text-red-600 text-xl">Failed</p>;

  const images = res.data.result.resources.map((image: any) => ({
    url: image.secure_url,
    name: (image.public_id as string).split("/")[3],
  }));
  console.log(res.data);

  function clickHandler(e: React.MouseEvent<HTMLImageElement>) {
    const target = e.target as HTMLImageElement;
    const alt = target.alt;

    if (isSelected === alt) {
      setIsSelected("");
      return;
    }
    setIsSelected(alt);
  }

  return (
    <div className="grid grid-cols-4 gap-2 w-2/3 h-full overflow-y-scroll rounded-md bg-slate-50 p-4">
      {images.map((img: any, i: number) => (
        <figure key={`image-${i++}`} className="relative w-full h-60 aspect-square rounded-xl cursor-pointer hover:scale-[1.1] transition-all duration-500">
          <Image src={img.url} fill sizes="auto" onClick={clickHandler} alt={img.name} className={`object-cover rounded-xl ${isSelected === img.name ? `border-4 border-blue-300` : ``}`} />
        </figure>
      ))}
    </div>
  );
}
