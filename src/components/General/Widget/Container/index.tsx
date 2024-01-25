import React from "react";
import Images from "./Images";
import Preview from "./Preview";
import { Button } from "@/components/General/Button";
import { Input } from "@/components/General/Input";
import useSWRImmutable from "swr/immutable";
import { GalleryWidgetProps } from "..";
import { evertaleCharacterHandlers, evertaleWeaponHandlers } from "./handlers";

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export default function Container<T>({ data, setData, category, game }: GalleryWidgetProps<T>) {
  const [query, setQuery] = React.useState<string>("");
  const URL = `/api/file?game=${game.toLowerCase()}&category=${category}&format=webp&q=${query}`;
  const [imgSelected, setImgSelected] = React.useState<string[]>([]);
  const containerRef = React.useRef<null | HTMLDivElement>(null);
  const res = useSWRImmutable(URL, fetcher);

  function cancelHandler() {
    const element = containerRef.current?.parentElement as HTMLDivElement;
    element.classList.replace("visible", "invisible");
    element.classList.replace("opacity-1", "opacity-0");
  }

  function selectedHandler() {
    const url = [];

    for (const img of imgSelected) {
      const array = res.data.data.find((data: any) => data.name.includes(img));
      url.push(array.url);
    }

    if (game === "Evertale" && category === "characters") evertaleCharacterHandlers(url, data as Evertale.Character.State, setData as React.Dispatch<React.SetStateAction<Evertale.Character.State>>);
    if (game === "Evertale" && category === "weapons") evertaleWeaponHandlers(url, data as Evertale.Weapon.State, setData as React.Dispatch<React.SetStateAction<Evertale.Weapon.State>>);

    setImgSelected([]);

    const element = containerRef.current?.parentElement as HTMLDivElement;
    element.classList.replace("visible", "invisible");
    element.classList.replace("opacity-1", "opacity-0");
  }

  return (
    <div ref={containerRef} className="relative w-4/5 h-full overflow-hidden bg-white rounded-xl mx-auto py-2 px-4 shadow">
      <h1 className="font-bold font-playfair text-violet-700 text-3xl capitalize">
        {game} {category} Gallery
      </h1>
      <div className="w-full h-1 bg-violet-700 my-2"></div>
      <Input forId="image-cloud-name" label="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
      <div className="flex flex-row justify-between h-[380px] gap-4">
        <Images isSelected={imgSelected} setIsSelected={setImgSelected} res={res} />
        <Preview isSelected={imgSelected} setIsSelected={setImgSelected} game={game} category={category} />
      </div>
      <div>
        <Button variant="upload" type="button" disabled={imgSelected.length === 0} onClick={selectedHandler}>
          {imgSelected.length === 0 ? "No Selected" : `${imgSelected.length} Selected`}
        </Button>
        <Button variant="danger" type="button" onClick={cancelHandler}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
