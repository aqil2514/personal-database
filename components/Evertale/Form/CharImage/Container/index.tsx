import React, { SetStateAction } from "react";
import Images from "./Images";
import Preview from "./Preview";
import { Button } from "@/components/General/Button";
import { Input } from "@/components/General/Input";
import useSWRImmutable from "swr/immutable";
import { StateType, useData } from "../..";

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export default function Container({ data, setData }: { data: Evertale.Character.State; setData: React.Dispatch<SetStateAction<Evertale.Character.State>> }) {
  const [query, setQuery] = React.useState<string>("");
  const URL = `/api/file?game=evertale&category=characters&format=webp&q=${query}`;
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
      const array = res.data.result.resources.find((data: any) => data.public_id.includes(img));
      url.push(array.secure_url);
    }

    const f1Img = url.filter((u: string) => u.includes("01.webp")).toString();
    const f2Img = url.filter((u: string) => u.includes("02.webp")).toString();
    const f3Img = url.filter((u: string) => u.includes("03.webp")).toString();

    setData({ ...data, charImage: { f1Img, f2Img, f3Img } });
    setImgSelected([]);

    const element = containerRef.current?.parentElement as HTMLDivElement;
    element.classList.replace("visible", "invisible");
    element.classList.replace("opacity-1", "opacity-0");
  }
  return (
    <div ref={containerRef} className="relative w-4/5 h-full overflow-hidden bg-white rounded-xl mx-auto py-2 px-4 shadow">
      <h1 className="font-bold font-playfair text-violet-700 text-3xl">Evertale Character Gallery</h1>
      <div className="w-full h-1 bg-violet-700 my-2"></div>
      <Input forId="image-cloud-name" label="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
      <div className="flex flex-row justify-between h-[450px] gap-4">
        <Images isSelected={imgSelected} setIsSelected={setImgSelected} res={res} />
        <Preview isSelected={imgSelected} setIsSelected={setImgSelected} />
      </div>
      <div>
        <Button variant="upload" disabled={imgSelected.length === 0} onClick={selectedHandler}>
          {imgSelected.length === 0 ? "No Selected" : `${imgSelected.length} Selected`}
        </Button>
        <Button variant="danger" onClick={cancelHandler}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
