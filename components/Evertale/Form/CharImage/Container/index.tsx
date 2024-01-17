import React from "react";
import Images from "./Images";
import Preview from "./Preview";
import { Button } from "@/components/General/Button";
import { Input } from "@/components/General/Input";

export default function Container() {
  const [imgSelected, setImgSelected] = React.useState<string>("");
  const [query, setQuery] = React.useState<string>("");
  const containerRef = React.useRef<null | HTMLDivElement>(null);

  function cancelHandler() {
    const element = containerRef.current?.parentElement as HTMLDivElement;
    element.classList.replace("visible", "invisible");
    element.classList.replace("opacity-1", "opacity-0");
    console.log(containerRef.current?.parentElement);
  }
  return (
    <div ref={containerRef} className="relative w-4/5 h-full overflow-hidden bg-white rounded-xl mx-auto py-2 px-4 shadow">
      <h1 className="font-bold font-playfair text-violet-700 text-3xl">Evertale Character Gallery</h1>
      <div className="w-full h-1 bg-violet-700 my-2"></div>
      <Input forId="image-cloud-name" label="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
      <div className="flex flex-row justify-between h-[450px] gap-4">
        <Images isSelected={imgSelected} setIsSelected={setImgSelected} query={query} />
        <Preview isSelected={imgSelected} setIsSelected={setImgSelected} />
      </div>
      <div>
        <Button variant="upload" disabled={!imgSelected}>
          Select
        </Button>
        <Button variant="danger" onClick={cancelHandler}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
