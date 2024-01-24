import React from "react";
import Container from "./Container";

export default function GalleryWidget({ data, setData }: { data: Evertale.Character.State; setData: React.Dispatch<React.SetStateAction<Evertale.Character.State>> }) {
  return (
    <div id="container-image" className="w-screen h-screen bg-[rgba(0,0,0,0.8)] fixed top-0 left-0 py-10 invisible opacity-0">
      <Container data={data} setData={setData} />
    </div>
  );
}
