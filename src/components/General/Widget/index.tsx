import React from "react";
import Container from "./Container";

export interface GalleryWidgetProps<T> {
  game: "Evertale";
  category: "characters" | "weapons";
  data: T;
  setData: React.Dispatch<React.SetStateAction<T>>;
}

export default function GalleryWidget<T>({ game, category, data, setData }: GalleryWidgetProps<T>) {
  return (
    <div id="container-image" className="w-screen h-screen bg-[rgba(0,0,0,0.8)] fixed top-0 left-0 py-10 invisible opacity-0">
      <Container game={game} category={category} data={data} setData={setData} />
    </div>
  );
}
