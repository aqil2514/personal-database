import React from "react";
import Container from "./Container";

export default function GalleryWidget({ ref }: { ref: React.RefObject<HTMLDivElement> }) {
  return (
    <div id="container-image" ref={ref} className="w-screen h-screen bg-[rgba(0,0,0,0.8)] fixed top-0 left-0 py-10 invisible opacity-0">
      <Container />
    </div>
  );
}
